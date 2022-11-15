package com.ttlive.service;

import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;

import javax.ejb.EJB;
import javax.ejb.Stateless;

import com.ttlive.bo.GameSet.InvalidGameSetFormat;
import com.ttlive.bo.Match;
import com.ttlive.bo.RequestLineup;
import com.ttlive.bo.RequestLineup.RequestDoubles;
import com.ttlive.bo.RequestLineup.RequestPlayer;
import com.ttlive.bo.RequestMatch;
import com.ttlive.persistence.dao.GameStyleDao;
import com.ttlive.persistence.dao.LeagueDao;
import com.ttlive.persistence.dao.MatchDao;
import com.ttlive.persistence.dao.RegionDao;
import com.ttlive.persistence.dao.TeamDao;
import com.ttlive.persistence.entity.DoublesEntity;
import com.ttlive.persistence.entity.GameStyleEntity;
import com.ttlive.persistence.entity.LeagueEntity;
import com.ttlive.persistence.entity.MatchEntity;
import com.ttlive.persistence.entity.PlayerEntity;
import com.ttlive.persistence.entity.RegionEntity;
import com.ttlive.persistence.entity.TeamEntity;
import com.ttlive.utils.BadRestRequestException;
import com.ttlive.utils.MatchFactory;

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

	public LinkedList<Match> findAll() throws InvalidGameSetFormat {
		List<MatchEntity> entities = matchDao.findAll();
		return getDefault(entities);
	}

	public Match findById(long id) throws InvalidGameSetFormat, BadRestRequestException {
		MatchEntity match = matchDao.findById(id);
		if (match == null)
			throw new BadRestRequestException("id", "Match with the given id='" + id + " doesn't exist");
		return getDefault(match);
	}

	public Match create(RequestMatch requestMatch) throws InvalidGameSetFormat, BadRestRequestException {

		RegionEntity regionEntity = regionDao.findById(requestMatch.getRegionId());
		if (regionEntity == null)
			throw new BadRestRequestException("regionId",
					"Region with the given id='" + requestMatch.getRegionId() + " doesn't exist");

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
		HashSet<String> existingCodes = matchDao.getAllCodes();

		MatchEntity matchEntity = MatchFactory.createMatchEntity(requestMatch, regionEntity, gameStyleEntity, leagueEntity,
				homeTeamEntity, guestTeamEntity, existingCodes);
		matchDao.persist(matchEntity);

		return getDefault(matchEntity);

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

		return getDefault(match);

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
