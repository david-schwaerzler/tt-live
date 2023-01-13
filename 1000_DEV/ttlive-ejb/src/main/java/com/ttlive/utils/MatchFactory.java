package com.ttlive.utils;

import java.util.HashSet;
import java.util.LinkedList;

import com.ttlive.bo.request.RequestMatch;
import com.ttlive.persistence.entity.AccountEntity;
import com.ttlive.persistence.entity.DoublesEntity;
import com.ttlive.persistence.entity.GameEntity;
import com.ttlive.persistence.entity.GameStyleEntity;
import com.ttlive.persistence.entity.LeagueEntity;
import com.ttlive.persistence.entity.MatchEntity;
import com.ttlive.persistence.entity.PlayerEntity;
import com.ttlive.persistence.entity.RegionEntity;
import com.ttlive.persistence.entity.TeamEntity;

public class MatchFactory {

	public static MatchEntity createMatchEntity(
			AccountEntity account,
			RequestMatch requestMatch, 
			RegionEntity regionEntity, 
			GameStyleEntity gameStyleEntity,
			LeagueEntity leagueEntity,
			TeamEntity homeTeamEntity,
			TeamEntity guestTeamEntity,
			HashSet<String> existingCodes ) {
		
		// create new leage if it doesn't exist
		if(leagueEntity == null){
			leagueEntity = new LeagueEntity();
			leagueEntity.setName(requestMatch.getLeague().getName());
			leagueEntity.setContest(requestMatch.getLeague().getContest());
			leagueEntity.setRegion(regionEntity);
		}

		// create homeTeam if it doesn't exist
		if(homeTeamEntity == null) {
			homeTeamEntity = new TeamEntity();
			homeTeamEntity.setClub(requestMatch.getHomeTeam().getClub());
			homeTeamEntity.setNumber(requestMatch.getHomeTeam().getNumber());
			homeTeamEntity.setLeague(leagueEntity);
		}

		// create guestTeam if it doesn't exist
		if(guestTeamEntity == null) {
			guestTeamEntity = new TeamEntity();
			guestTeamEntity.setClub(requestMatch.getGuestTeam().getClub());
			guestTeamEntity.setNumber(requestMatch.getGuestTeam().getNumber());
			guestTeamEntity.setLeague(leagueEntity);
		}

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
		matchEntity.setAccount(account);

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
		
		return matchEntity;		
	}
}
