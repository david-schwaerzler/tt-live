package com.ttlive.service;

import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ws.rs.NotAuthorizedException;

import com.ttlive.bo.GameSet.InvalidGameSetFormat;
import com.ttlive.bo.Match;
import com.ttlive.bo.request.RequestLineup;
import com.ttlive.bo.request.RequestLineup.RequestDoubles;
import com.ttlive.bo.request.RequestLineup.RequestPlayer;
import com.ttlive.exceptions.BadRestRequestException;
import com.ttlive.exceptions.NotFoundException;
import com.ttlive.bo.request.RequestMatch;
import com.ttlive.persistence.dao.AccountDao;
import com.ttlive.persistence.dao.GameStyleDao;
import com.ttlive.persistence.dao.LeagueDao;
import com.ttlive.persistence.dao.MatchDao;
import com.ttlive.persistence.dao.RegionDao;
import com.ttlive.persistence.dao.TeamDao;
import com.ttlive.persistence.entity.AccountEntity;
import com.ttlive.persistence.entity.DoublesEntity;
import com.ttlive.persistence.entity.GameEntity;
import com.ttlive.persistence.entity.GameStyleEntity;
import com.ttlive.persistence.entity.LeagueEntity;
import com.ttlive.persistence.entity.MatchEntity;
import com.ttlive.persistence.entity.PlayerEntity;
import com.ttlive.persistence.entity.RegionEntity;
import com.ttlive.persistence.entity.TeamEntity;
import com.ttlive.session.MatchEventObserver;
import com.ttlive.utils.MatchFactory;
import com.ttlive.utils.MatchState;

@Stateless
public class MatchService {

	@EJB
	private MatchDao matchDao;

	@EJB
	private RegionDao regionDao;

	@EJB
	private GameStyleDao gameStyleDao;

	@EJB
	private LeagueDao leagueDao;

	@EJB
	private TeamDao teamDao;

	@EJB
	private TeamService teamService;

	@EJB
	private LeagueService leagueService;

	@EJB
	private MatchEventObserver eventObserver;

	@EJB
	private AccountDao accountDao;

	public LinkedList<Match> findAll() throws InvalidGameSetFormat {
		List<MatchEntity> entities = matchDao.findAll();
		return getDefault(entities);
	}
	
	public LinkedList<Match> findPublic() throws InvalidGameSetFormat {
		List<MatchEntity> entities = matchDao.findPublic();
		return getDefault(entities);
	}

	public Match findById(long id) throws InvalidGameSetFormat, BadRestRequestException, NotFoundException {
		MatchEntity match = matchDao.findById(id);
		if (match == null)
			throw new NotFoundException("id", "Match with the given id='" + id + " doesn't exist");
		return getDefault(match);
	}

	public Match create(RequestMatch requestMatch) throws InvalidGameSetFormat, BadRestRequestException {

		AccountEntity account = null;
		if (requestMatch.getAccountUsername() != null) {
			account = accountDao.findByName(requestMatch.getAccountUsername());
			if (account == null)
				throw new BadRestRequestException("accountUsername",
						"Username with the name='" + requestMatch.getAccountUsername() + "' doesn't exist");
		}

		RegionEntity regionEntity = regionDao.findById(requestMatch.getLeague().getRegionId());
		if (regionEntity == null)
			throw new BadRestRequestException("regionId",
					"Region with the given id='" + requestMatch.getLeague().getRegionId() + " doesn't exist");

		GameStyleEntity gameStyleEntity = gameStyleDao.findById(requestMatch.getGameStyleId());
		if (gameStyleEntity == null)
			throw new BadRestRequestException("gameStyleId",
					"GameStyle with the given id='" + requestMatch.getGameStyleId() + " doesn't exist");

		LeagueEntity leagueEntity = null;
		if (requestMatch.getLeague().getId() != -1) {
			leagueEntity = leagueDao.findById(requestMatch.getLeague().getId());
			if (leagueEntity == null)
				throw new BadRestRequestException("leagueId",
						"League with the given id='" + requestMatch.getGameStyleId() + " doesn't exist");
		}
		TeamEntity homeTeamEntity = null;
		if (requestMatch.getHomeTeam().getId() != -1) {
			homeTeamEntity = teamDao.findById(requestMatch.getHomeTeam().getId());
			if (homeTeamEntity == null)
				throw new BadRestRequestException("homeTeamId",
						"HomeTeam with the given id='" + requestMatch.getHomeTeam().getId() + " doesn't exist");
		}

		TeamEntity guestTeamEntity = null;
		if (requestMatch.getGuestTeam().getId() != -1) {
			guestTeamEntity = teamDao.findById(requestMatch.getGuestTeam().getId());
			if (guestTeamEntity == null)
				throw new BadRestRequestException("guestTeamId",
						"GuestTeam with the given id='" + requestMatch.getHomeTeam().getId() + " doesn't exist");
		}
		HashSet<String> existingCodes = matchDao.findAllCodes();

		MatchEntity matchEntity = MatchFactory.createMatchEntity(account, requestMatch, regionEntity, gameStyleEntity,
				leagueEntity, homeTeamEntity, guestTeamEntity, existingCodes);		
		
		matchDao.persist(matchEntity);

		return getDefault(matchEntity);

	}
	
	public void delete(long id, String username) {
		
		MatchEntity matchEntity = matchDao.findById(id);
		
		if(matchEntity.getAccount() == null) {
			matchDao.remove(matchEntity);
		}else {
			AccountEntity accountEntity = accountDao.findByName(username);
			if(accountEntity == null)
				throw new NotAuthorizedException("Must be logged in to delete this match");
			
			if(accountEntity.getId() != matchEntity.getAccount().getId())
				throw new NotAuthorizedException("The logged in user is not allowed to delete this match");
			
			matchDao.remove(matchEntity);			
		}		
	}

	public LinkedList<Match> getDefault(List<MatchEntity> entities) throws InvalidGameSetFormat {
		LinkedList<Match> matches = new LinkedList<Match>();
		for (MatchEntity entity : entities) {
			matches.add(getDefault(entity));
		}
		return matches;
	}

	public boolean isEditorCodeValid(long id, String editorCode) throws BadRestRequestException {
		MatchEntity match = matchDao.findById(id);
		if (match == null)
			throw new BadRestRequestException("id", "Match with the given id='" + id + " doesn't exist");

		return match.getEditorCode().equals(editorCode);
	}

	public Match updateLineup(long id, RequestLineup lineup) throws InvalidGameSetFormat, BadRestRequestException {

		MatchEntity match = matchDao.findById(id);
		if (match == null)
			throw new BadRestRequestException("id", "Match with the given id='" + id + " doesn't exist");

		for (RequestDoubles doubles : lineup.getDoubles()) {
			DoublesEntity existing = null;
			for (DoublesEntity entity : match.getDoubles()) {
				if (entity.getId() == doubles.getId()) {
					existing = entity;
				}
			}
			if (existing == null)
				throw new BadRestRequestException("doubleId", "Double with the given id='" + doubles.getId()
						+ " doesn't exist or doesn't belong to the match");

			existing.setPlayer1(doubles.getPlayer1());
			existing.setPlayer2(doubles.getPlayer2());
		}

		for (RequestPlayer player : lineup.getPlayers()) {
			PlayerEntity existing = null;
			for (PlayerEntity entity : match.getPlayers()) {
				if (entity.getId() == player.getId()) {
					existing = entity;
				}
			}
			if (existing == null)
				throw new BadRestRequestException("playerId", "Player with the given id='" + player.getId()
						+ " doesn't exist or doesn't belong to the match");

			existing.setName(player.getName());
		}

		Match matchBo = getDefault(match);

		eventObserver.fireMatchEvent(matchBo);
		return matchBo;

	}

	public Match updateScoreAndState(MatchEntity matchEntity) throws InvalidGameSetFormat {

		int homeScore = 0;
		int guestScore = 0;

		for (GameEntity game : matchEntity.getGames()) {
			if (game.getState() == MatchState.FINISHED) {
				if (game.getHomeSets() > game.getGuestSets()) {
					homeScore++;
				} else {
					guestScore++;
				}
			}
		}

		matchEntity.setHomeTeamScore(homeScore);
		matchEntity.setGuestTeamScore(guestScore);

		GameStyleEntity gameStyleEntity = matchEntity.getGameStyle();
		if (gameStyleEntity == null)
			throw new NullPointerException("The match(id='" + matchEntity.getId()
					+ "') doesn't have a gameStyle. This is illegal and should never happen");

		MatchState state = MatchState.NOT_STARTED;

		if (gameStyleEntity.isFinishingEarly()) {
			if (homeScore == gameStyleEntity.getGamesToFinish() || guestScore == gameStyleEntity.getGamesToFinish()) {
				state = MatchState.FINISHED;
			} else if (homeScore == guestScore && homeScore == gameStyleEntity.getGamesToFinish() - 1) {
				state = MatchState.FINISHED;
			}
		} else {
			if (homeScore + guestScore >= gameStyleEntity.getGamesToFinish())
				state = MatchState.FINISHED;
		}

		if (state != MatchState.FINISHED) {
			if (homeScore != 0 || guestScore != 0) {
				state = MatchState.LIVE;
			} else {
				// only this when score is 0:0
				for (GameEntity game : matchEntity.getGames()) {
					if (game.getState() != MatchState.NOT_STARTED) {
						state = MatchState.LIVE;
						break;
					}
				}
			}
		}
		matchEntity.setState(state);

		Match match = getDefault(matchEntity);
		eventObserver.fireMatchEvent(match);
		return match;
	}

	public Match updateMatch(long id, RequestMatch requestMatch) throws BadRestRequestException, InvalidGameSetFormat {
		MatchEntity matchEntity = matchDao.findById(id);

		if (matchEntity == null)
			throw new BadRestRequestException("id", "Match with the given id='" + id + " doesn't exist");

		if (requestMatch.getGameStyleId() != matchEntity.getGameStyle().getId())
			throw new BadRestRequestException("gameStyleId", "GameStyleId must be set");

		LeagueEntity oldLeague = matchEntity.getLeague();
		LeagueEntity updatedLeague = leagueService.updateLeague(oldLeague, requestMatch.getLeague());
		matchEntity.setLeague(updatedLeague);

		TeamEntity oldHomeTeam = matchEntity.getHomeTeam();
		TeamEntity updatedHomeTeam = teamService.updateTeam(oldHomeTeam, requestMatch.getHomeTeam(), updatedLeague);
		matchEntity.setHomeTeam(updatedHomeTeam);

		TeamEntity oldGuestTeam = matchEntity.getGuestTeam();
		TeamEntity updatedGuestTeam = teamService.updateTeam(oldGuestTeam, requestMatch.getGuestTeam(), updatedLeague);
		matchEntity.setGuestTeam(updatedGuestTeam);

		matchEntity.setStartDate(requestMatch.getStartDate());
		// can only updatethe visibility when the account is set (otherwise it mus be private)
		if(matchEntity.getAccount() != null)
			matchEntity.setVisibility(requestMatch.getVisibility());

		if (oldHomeTeam.getHomeMatches().size() == 0 && oldHomeTeam.getGuestMatches().size() == 0) {
			// need to set the league to null, to remove the team from the league
			// this might change wether the league will be deleted or not
			oldHomeTeam.setLeague(null);
			teamDao.remove(oldHomeTeam);
		}

		if (oldGuestTeam.getHomeMatches().size() == 0 && oldGuestTeam.getGuestMatches().size() == 0) {
			// need to set the league to null, to remove the team from the league
			// this might change wether the league will be deleted or not
			oldGuestTeam.setLeague(null);
			teamDao.remove(oldGuestTeam);
		}
		if (oldLeague.getTeams().size() == 0 && oldLeague.getMatches().size() == 0) {
			leagueDao.remove(oldLeague);
		}

		matchDao.flush();

		Match match = getDefault(matchEntity);
		eventObserver.fireMatchEvent(match);
		return match;
	}

	public Match getDefault(MatchEntity entity) throws InvalidGameSetFormat {

		return Match.builder() //
				.entity(entity) //
				.league(entity.getLeague()) //
				.homeTeam(entity.getHomeTeam()) //
				.guestTeam(entity.getGuestTeam()) //
				.gameStyle(entity.getGameStyle()) //
				.players(entity.getPlayers()) //
				.doubles(entity.getDoubles()) //
				.games(entity.getGames()) //
				.account(entity.getAccount()) //
				.build();
	}

}
