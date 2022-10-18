package com.ttlive.dto;

import java.time.LocalDateTime;
import java.util.LinkedList;

import com.ttlive.bo.Match;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MatchDto {
	private long id;
	private String title;
	private String description;
	private int homeTeamScore;
	private int guestTeamScore;
	private String code;
	private String editorCode;

	private LocalDateTime createdAt;
	private LocalDateTime modifiedAt;

	private LeagueDto league;
	private TeamDto homeTeam;
	private TeamDto guestTeam;
	// private Account account;
	private GameStyleDto gameStyle;
	private LinkedList<GameDto> games;
	private LinkedList<PlayerDto> homePlayers;
	private LinkedList<PlayerDto> guestPlayers;
	private LinkedList<DoublesDto> homeDoubles;
	private LinkedList<DoublesDto> guestDoubles;

	public static class MatchDtoBuilder {
		public MatchDtoBuilder bo(Match bo) {
			this.id = bo.getId();
			this.title = bo.getTitle();
			this.description = bo.getDescription();
			this.homeTeamScore = bo.getHomeTeamScore();
			this.guestTeamScore = bo.getGuestTeamScore();
			this.createdAt = bo.getCreatedAt();
			this.editorCode = bo.getEditorCode();
			this.code = bo.getCode();
			this.modifiedAt = bo.getModifiedAt();

			this.league = LeagueDto.builder().bo(bo.getLeague()).build();
			this.homeTeam = TeamDto.builder().bo(bo.getHomeTeam()).build();
			this.guestTeam = TeamDto.builder().bo(bo.getGuestTeam()).build();
			this.gameStyle = GameStyleDto.builder().bo(bo.getGameStyle()).build();
			this.homePlayers = PlayerDto.fromBos(bo.getHomePlayers());
			this.guestPlayers = PlayerDto.fromBos(bo.getGuestPlayers());
			this.homeDoubles = DoublesDto.fromBos(bo.getHomeDoubles());
			this.guestDoubles = DoublesDto.fromBos(bo.getGuestDoubles());

			this.games = GameDto.fromBos(bo.getGames());

			return this;
		}
	}
}
