package com.ttlive.dto;

import java.time.LocalDateTime;
import java.util.LinkedList;
import java.util.List;

import com.ttlive.bo.Game;
import com.ttlive.bo.Match;
import com.ttlive.dto.SimpleMatchDto.SimpleGameDto.SimpleGameDtoBuilder;
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
		public SimpleMatchDtoBuilder bo(Match bo) {

			this.id = bo.getId();
			this.homeTeamScore = bo.getHomeTeamScore();
			this.guestTeamScore = bo.getGuestTeamScore();
			this.state = bo.getState();
			this.startDate = bo.getStartDate();
			this.league = LeagueDto.builder().bo(bo.getLeague()).build();
			this.homeClub = bo.getHomeTeam().getClub();
			this.homeNumber = bo.getHomeTeam().getNumber();
			this.guestClub = bo.getGuestTeam().getClub();
			this.guestNumber = bo.getGuestTeam().getNumber();

			this.simpleGames = new LinkedList<>();
			for (Game game : bo.getGames()) {
				SimpleGameDtoBuilder simpleGame = SimpleGameDto.builder() //
						.gameNumber(game.getGameNumber()) //
						.homeSets(game.getHomeSets()) //
						.guestSets(game.getGuestSets()) //
						.state(game.getState()) //
						.isDoubles(game.isDoubles());

				if (game.isDoubles()) {
					simpleGame = simpleGame.homePlayer1(game.getHomeDoubles().getPlayer1()) //
							.homePlayer2(game.getHomeDoubles().getPlayer2()) //
							.guestPlayer1(game.getGuestDoubles().getPlayer1()) //
							.guestPlayer2(game.getGuestDoubles().getPlayer2());
				} else {
					simpleGame = simpleGame.homePlayer1(game.getHomePlayer().getName()) //
							.guestPlayer1(game.getGuestPlayer().getName());
				}

				this.simpleGames.add(simpleGame.build());
			}

			return this;
		}
	}

	public static LinkedList<SimpleMatchDto> fromBos(List<Match> matches) {
		LinkedList<SimpleMatchDto> ret = new LinkedList<>();
		for (Match match : matches) {
			ret.add(SimpleMatchDto.builder().bo(match).build());
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
	}

}
