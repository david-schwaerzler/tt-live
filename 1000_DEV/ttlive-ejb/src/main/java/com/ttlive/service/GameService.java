package com.ttlive.service;

import java.util.LinkedList;
import java.util.List;

import javax.ejb.EJB;
import javax.ejb.Stateless;

import com.ttlive.bo.Game;
import com.ttlive.bo.GameSet;
import com.ttlive.bo.GameSet.InvalidGameSetFormat;
import com.ttlive.bo.request.RequestGameSet;
import com.ttlive.persistence.dao.GameDao;
import com.ttlive.persistence.entity.GameEntity;
import com.ttlive.session.MatchEventObserver;
import com.ttlive.utils.BadRestRequestException;
import com.ttlive.utils.MatchState;

@Stateless
public class GameService {

	@EJB
	private GameDao gameDao;

	@EJB
	private MatchEventObserver eventObserver;

	@EJB
	private MatchService matchService;

	public Game updateSet(long gameId, RequestGameSet requestSet) throws BadRestRequestException, InvalidGameSetFormat {
		GameEntity gameEntity = gameDao.findById(gameId);
		if (gameEntity == null)
			throw new NullPointerException("Game with the given id='" + gameId + " doesn't exist");

		int setSum = gameEntity.getHomeSets() + gameEntity.getGuestSets();
		if (gameEntity.getHomeSets() >= 3 || gameEntity.getGuestSets() >= 3) { // one player has won
			if (requestSet.getNumber() > setSum)
				throw new BadRestRequestException("number", "Set is already over wit result " + gameEntity.getHomeSets()
						+ ": " + gameEntity.getGuestSets() + ". Can't update set" + requestSet.getNumber());
		} else {
			if (requestSet.getNumber() > setSum + 1)
				throw new BadRestRequestException("number", "Set is already over wit result " + gameEntity.getHomeSets()
						+ ": " + gameEntity.getGuestSets() + ". Can't update set" + requestSet.getNumber());
		}

		switch (requestSet.getNumber()) {
		case 1:
			gameEntity.setSet1(requestSet.getHomeScore() + ":" + requestSet.getGuestScore());
			if (requestSet.getHomeScore() == 0 && requestSet.getGuestScore() == 0) {
				gameEntity.setSet2(null);
				gameEntity.setSet3(null);
				gameEntity.setSet4(null);
				gameEntity.setSet5(null);
			}
			break;
		case 2:
			gameEntity.setSet2(requestSet.getHomeScore() + ":" + requestSet.getGuestScore());
			if (requestSet.getHomeScore() == 0 && requestSet.getGuestScore() == 0) {
				gameEntity.setSet3(null);
				gameEntity.setSet4(null);
				gameEntity.setSet5(null);
			}
			break;
		case 3:
			gameEntity.setSet3(requestSet.getHomeScore() + ":" + requestSet.getGuestScore());
			if (requestSet.getHomeScore() == 0 && requestSet.getGuestScore() == 0) {
				gameEntity.setSet4(null);
				gameEntity.setSet5(null);
			}
			break;
		case 4:
			gameEntity.setSet4(requestSet.getHomeScore() + ":" + requestSet.getGuestScore());
			if (requestSet.getHomeScore() == 0 && requestSet.getGuestScore() == 0) {
				gameEntity.setSet5(null);
			}
			break;
		case 5:
			gameEntity.setSet5(requestSet.getHomeScore() + ":" + requestSet.getGuestScore());
			break;
		}

		List<GameSet> sets = createSets(gameEntity);
		int homeScore = 0;
		int guestScore = 0;
		for (GameSet set : sets) {
			if (set.getState() == MatchState.FINISHED) {
				if (set.getHomeScore() > set.getGuestScore())
					homeScore++;
				else
					guestScore++;
			} else {
				break;
			}
			if (homeScore >= 3 || guestScore >= 3) {
				break;
			}
		}

		MatchState state = MatchState.LIVE;
		MatchState oldState = gameEntity.getState();
		if (homeScore >= 3 || guestScore >= 3)
			state = MatchState.FINISHED;
		else if (homeScore == 0 && guestScore == 0 && sets.get(0).getHomeScore() == 0 && sets.get(0).getGuestScore() == 0)
			state = MatchState.NOT_STARTED;

		gameEntity.setHomeSets(homeScore);
		gameEntity.setGuestSets(guestScore);
		gameEntity.setState(state);

		Game game = getDefault(gameEntity);

		// the score of the match should be recalculated when:
		// 1. the match moved to the finished state
		boolean scoreChanged = oldState == MatchState.FINISHED && state != MatchState.FINISHED;
		// 2. moved away from the finished state
		scoreChanged = scoreChanged || (oldState != MatchState.FINISHED && state == MatchState.FINISHED);
		// 3. Changed the result of the last set (this might or might not change the
		// result)
		scoreChanged = scoreChanged
				|| (oldState == MatchState.FINISHED && state == MatchState.FINISHED && requestSet.getNumber() == 5);

		// update the match when:
		// - The game result changed -> this will cause a recalculation of the match
		// score
		// - The match is not started yet and a game has been modified -> this will
		// cause the game state to be live
		// - The game has been reverted to NOT_STARTED. There could be a chance that
		// this was the only game modified and the state of the game will be NOT_STARTED
		// again
		if (scoreChanged || gameEntity.getMatch().getState() == MatchState.NOT_STARTED
				|| gameEntity.getState() == MatchState.NOT_STARTED) {
			// this will fire a game update event. Therefore the gameEvent don't need to be
			// fired
			matchService.updateScoreAndState(gameEntity.getMatch());
		} else {
			eventObserver.fireGameEvent(gameEntity.getMatch().getId(), game);
		}

		return game;
	}

	public LinkedList<GameSet> createSets(GameEntity entity) throws InvalidGameSetFormat {
		LinkedList<GameSet> sets = new LinkedList<GameSet>();
		sets.add(GameSet.builder().set(entity.getSet1(), 1).build());
		sets.add(GameSet.builder().set(entity.getSet2(), 2).build());
		sets.add(GameSet.builder().set(entity.getSet3(), 3).build());
		sets.add(GameSet.builder().set(entity.getSet4(), 4).build());
		sets.add(GameSet.builder().set(entity.getSet5(), 5).build());
		return sets;
	}

	public boolean isEditorCodeValid(long gameId, String editorCode) throws BadRestRequestException {
		GameEntity gameEntity = gameDao.findById(gameId);
		if (gameEntity == null)
			throw new BadRestRequestException("id", "GameEntity with the given id='" + gameId + " doesn't exist");

		if (gameEntity.getMatch() == null)
			throw new BadRestRequestException("id",
					"GameEntity with the given id='" + gameId + " isn't attached to a match");

		return gameEntity.getMatch().getEditorCode().equals(editorCode);
	}

	private Game getDefault(GameEntity entity) throws InvalidGameSetFormat {
		return Game.builder().entity(entity).players(entity).doubles(entity).build();
	}
}