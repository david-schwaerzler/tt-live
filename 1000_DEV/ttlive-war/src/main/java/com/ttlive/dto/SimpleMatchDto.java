package com.ttlive.dto;

import java.time.LocalDateTime;
import java.util.LinkedList;
import java.util.List;

import com.ttlive.bo.Game;
import com.ttlive.bo.Match;
import com.ttlive.utils.MatchState;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SimpleMatchDto {

	private long id;
	private int homeTeamScore;
	private int guestTeamScore;
	private MatchState state;
	private LocalDateTime startDate;

	private LeagueDto league;
	private String homeClub;
	private int homeNumber;
	private String guestClub;
	private int guestNumber;

	private LinkedList<SimpleGameDto> simpleGames;

	public static class SimpleMatchDtoBuilder {
		public SimpleMatchDtoBuilder bo(Match bo, String[] fields) {

			if (fields == null) {
				fields = new String[] { "id", "homeTeamScore", "guestTeamScore", "state", "startDate", "league",
						"homeClub", "homeNumber", "guestClub", "guestNumber" };
			}

			for (String field : fields) {
				switch (field) {
				case "id":
					this.id = bo.getId();
					break;
				case "homeTeamScore":
					this.homeTeamScore = bo.getHomeTeamScore();
					break;
				case "guestTeamScore":
					this.guestTeamScore = bo.getGuestTeamScore();
					break;
				case "state":
					this.state = bo.getState();
					break;
				case "startDate":
					this.startDate = bo.getStartDate();
					break;
				case "league":
					this.league = LeagueDto.builder().bo(bo.getLeague()).build();
					break;
				case "homeClub":
					this.homeClub = bo.getHomeTeam().getClub();
					break;
				case "homeNumber":
					this.homeNumber = bo.getHomeTeam().getNumber();
					break;
				case "guestClub":
					this.guestClub = bo.getGuestTeam().getClub();
					break;
				case "guestNumber":
					this.guestNumber = bo.getGuestTeam().getNumber();
					break;
				case "games":
					this.simpleGames = SimpleGameDto.fromBos(bo.getGames(), null);
					break;
				}
			}

			return this;
		}
	}

	public static LinkedList<SimpleMatchDto> fromBos(List<Match> matches, String[] fields) {
		LinkedList<SimpleMatchDto> ret = new LinkedList<>();
		for (Match match : matches) {
			ret.add(SimpleMatchDto.builder().bo(match, fields).build());
		}
		return ret;
	}

	@Data
	@Builder
	public static class SimpleGameDto {
		private int gameNumber;
		private int homeSets;
		private int guestSets;
		private boolean isDoubles;
		private String homePlayer1;
		private String homePlayer2;
		private String guestPlayer1;
		private String guestPlayer2;
		private MatchState state;

		public static class SimpleGameDtoBuilder {
			public SimpleGameDtoBuilder bo(Game game, String[] fields) {
				this.gameNumber = game.getGameNumber();
				this.homeSets = game.getHomeSets();
				this.guestSets = game.getGuestSets();
				this.state = game.getState();
				this.isDoubles = game.isDoubles();

				if (game.isDoubles()) {
					this.homePlayer1 = game.getHomeDoubles().getPlayer1();
					this.homePlayer2 = game.getHomeDoubles().getPlayer2();
					this.guestPlayer1 = game.getGuestDoubles().getPlayer1();
					this.guestPlayer2 = game.getGuestDoubles().getPlayer2();
				} else {
					this.homePlayer1 = game.getHomePlayer().getName();
					this.guestPlayer1 = game.getGuestPlayer().getName();
				}

				return this;
			}
		}

		public static LinkedList<SimpleGameDto> fromBos(List<Game> games, String[] fields) {
			LinkedList<SimpleGameDto> ret = new LinkedList<>();
			for (Game game : games) {
				ret.add(SimpleGameDto.builder().bo(game, fields).build());
			}
			return ret;
		}
	}

}
