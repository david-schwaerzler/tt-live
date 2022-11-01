package com.ttlive.service;

import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;

import javax.ejb.EJB;
import javax.ejb.Stateless;

import com.ttlive.bo.GameSet.InvalidGameSetFormat;
import com.ttlive.bo.Match;
import com.ttlive.bo.RequestMatch;
import com.ttlive.persistence.dao.GameStyleDao;
import com.ttlive.persistence.dao.LeagueDao;
import com.ttlive.persistence.dao.MatchDao;
import com.ttlive.persistence.dao.RegionDao;
import com.ttlive.persistence.dao.TeamDao;
import com.ttlive.persistence.entity.DoublesEntity;
import com.ttlive.persistence.entity.GameEntity;
import com.ttlive.persistence.entity.GameStyleEntity;
import com.ttlive.persistence.entity.LeagueEntity;
import com.ttlive.persistence.entity.MatchEntity;
import com.ttlive.persistence.entity.PlayerEntity;
import com.ttlive.persistence.entity.RegionEntity;
import com.ttlive.persistence.entity.TeamEntity;
import com.ttlive.utils.CodeFactory;
import com.ttlive.utils.GameFactory;
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
	
	
	public LinkedList<Match> findAll() throws InvalidGameSetFormat{
		List<MatchEntity> entities = matchDao.findAll();
		return getDefault(entities);
	}
	
	public Match findById(long id) throws InvalidGameSetFormat{
		MatchEntity match = matchDao.findById(id);
		if (match == null)
			throw new NullPointerException(
					"Match with the given id='" + id + " doesn't exist");		
		return getDefault(match);
	}

	public Match create(RequestMatch requestMatch) throws InvalidGameSetFormat {

		RegionEntity regionEntity = regionDao.findById(requestMatch.getRegionId());
		if (regionEntity == null)
			throw new NullPointerException(
					"Region with the given id='" + requestMatch.getRegionId() + " doesn't exist");

		GameStyleEntity gameStyleEntity = gameStyleDao.findById(requestMatch.getGameStyleId());
		if (gameStyleEntity == null)
			throw new NullPointerException(
					"GameStyle with the given id='" + requestMatch.getGameStyleId() + " doesn't exist");

		LeagueEntity leagueEntity = null;
		if (requestMatch.getLeague().getId() != -1) {
			leagueEntity = leagueDao.findById(requestMatch.getLeague().getId());
			if (leagueEntity == null)
				throw new NullPointerException(
						"League with the given id='" + requestMatch.getGameStyleId() + " doesn't exist");
		} else {
			leagueEntity = new LeagueEntity();
			leagueEntity.setName(requestMatch.getLeague().getName());
			leagueEntity.setContest(requestMatch.getLeague().getContest());
			leagueEntity.setRegion(regionEntity);
		}

		TeamEntity homeTeamEntity = null;
		if (requestMatch.getHomeTeam().getId() != -1) {
			homeTeamEntity = teamDao.findById(requestMatch.getHomeTeam().getId());
			if (homeTeamEntity == null)
				throw new NullPointerException(
						"HomeTeam with the given id='" + requestMatch.getHomeTeam().getId() + " doesn't exist");
		} else {
			homeTeamEntity = new TeamEntity();
			homeTeamEntity.setClub(requestMatch.getHomeTeam().getClub());
			homeTeamEntity.setNumber(requestMatch.getHomeTeam().getNumber());
			homeTeamEntity.setLeague(leagueEntity);
		}

		TeamEntity guestTeamEntity = null;
		if (requestMatch.getGuestTeam().getId() != -1) {
			guestTeamEntity = teamDao.findById(requestMatch.getGuestTeam().getId());
			if (guestTeamEntity == null)
				throw new NullPointerException(
						"HomeTeam with the given id='" + requestMatch.getHomeTeam().getId() + " doesn't exist");
		} else {
			guestTeamEntity = new TeamEntity();
			guestTeamEntity.setClub(requestMatch.getGuestTeam().getClub());
			guestTeamEntity.setNumber(requestMatch.getGuestTeam().getNumber());
			guestTeamEntity.setLeague(leagueEntity);
		}
		
		HashSet<String> existingCodes = matchDao.getAllCodes();

		MatchEntity matchEntity = new MatchEntity();
		matchEntity.setTitle("");
		matchEntity.setDescription("");
		matchEntity.setHomeTeamScore(0);
		matchEntity.setGuestTeamScore(0);
		matchEntity.setLeague(leagueEntity);
		matchEntity.setHomeTeam(homeTeamEntity);
		matchEntity.setGuestTeam(guestTeamEntity);
		matchEntity.setGameStyle(gameStyleEntity);
		matchEntity.setCode(CodeFactory.createCode(existingCodes));
		matchEntity.setEditorCode(CodeFactory.createCode(existingCodes));
		matchEntity.setStartDate(requestMatch.getStartDate());
		matchEntity.setState(MatchState.NOT_STARTED); 

		LinkedList<PlayerEntity> homePlayers = new LinkedList<PlayerEntity>();
		LinkedList<PlayerEntity> guestPlayers = new LinkedList<PlayerEntity>();
		LinkedList<DoublesEntity> homeDoubles = new LinkedList<DoublesEntity>();
		LinkedList<DoublesEntity> guestDoubles = new LinkedList<DoublesEntity>();

		for (int i = 0; i < gameStyleEntity.getNumDoubles(); i++) {

			DoublesEntity homeDouble = new DoublesEntity();
			homeDouble.setPosition(i + 1);
			homeDouble.setHomeTeam(true);
			homeDouble.setPlayer1("");
			homeDouble.setPlayer2("");
			homeDouble.setMatch(matchEntity);
			homeDoubles.add(homeDouble);

			DoublesEntity guestDouble = new DoublesEntity();
			guestDouble.setPosition(i + 1);
			guestDouble.setHomeTeam(false);
			guestDouble.setPlayer1("");
			guestDouble.setPlayer2("");
			guestDouble.setMatch(matchEntity);
			guestDoubles.add(guestDouble);
		}

		for (int i = 0; i < gameStyleEntity.getNumPlayers(); i++) {
			PlayerEntity homePlayer = new PlayerEntity();
			homePlayer.setName("");
			homePlayer.setPosition(i + 1);
			homePlayer.setHomeTeam(true);
			homePlayer.setMatch(matchEntity);
			homePlayers.add(homePlayer);

			PlayerEntity guestPlayer = new PlayerEntity();
			guestPlayer.setName("");
			guestPlayer.setPosition(i + 1);
			guestPlayer.setHomeTeam(false);
			guestPlayer.setMatch(matchEntity);
			guestPlayers.add(guestPlayer);
		}

		LinkedList<GameEntity> games = GameFactory.createGames(gameStyleEntity, homePlayers, guestPlayers, homeDoubles,
				guestDoubles);
		games.forEach(g -> g.setMatch(matchEntity));

		matchDao.persist(matchEntity);

		return getDefault(matchEntity);

	}

	public LinkedList<Match> getDefault(List<MatchEntity> entities) throws InvalidGameSetFormat{
		LinkedList<Match> matches = new LinkedList<Match>();
		for(MatchEntity entity: entities) {
			matches.add(getDefault(entity));
		}
		return matches;
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
				.games(entity.getGames()).build();
	}

}
