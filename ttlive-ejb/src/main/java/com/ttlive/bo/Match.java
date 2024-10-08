package com.ttlive.bo;

import java.time.LocalDateTime;
import java.util.LinkedList;
import java.util.List;

import com.ttlive.bo.GameSet.InvalidGameSetFormat;
import com.ttlive.persistence.entity.AccountEntity;
import com.ttlive.persistence.entity.DoublesEntity;
import com.ttlive.persistence.entity.GameEntity;
import com.ttlive.persistence.entity.GameStyleEntity;
import com.ttlive.persistence.entity.LeagueEntity;
import com.ttlive.persistence.entity.MatchEntity;
import com.ttlive.persistence.entity.PlayerEntity;
import com.ttlive.persistence.entity.TeamEntity;
import com.ttlive.utils.MatchState;
import com.ttlive.utils.MatchVisibility;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Match {
	private long id;
	private String title;
	private String description;
	private int homeTeamScore;
	private int guestTeamScore;
	private String code;
	private String editorCode;
	private MatchVisibility visibility;
	private MatchState state;
	private LocalDateTime startDate;
	private LocalDateTime endDate;

	private LocalDateTime createdAt;
	private LocalDateTime modifiedAt;

	private League league;
	private Team homeTeam;
	private Team guestTeam;
	private Account account;
	private GameStyle gameStyle;
	private LinkedList<Player> homePlayers;
	private LinkedList<Player> guestPlayers;
	private LinkedList<Doubles> homeDoubles;
	private LinkedList<Doubles> guestDoubles;
	private LinkedList<Game> games;

	public static class MatchBuilder {
		public MatchBuilder entity(MatchEntity entity) {
			this.id = entity.getId();
			this.title = entity.getTitle();
			this.description = entity.getDescription();
			this.homeTeamScore = entity.getHomeTeamScore();
			this.guestTeamScore = entity.getGuestTeamScore();
			this.code = entity.getCode();
			this.editorCode = entity.getEditorCode();
			this.state = entity.getState();
			this.startDate = entity.getStartDate();
			this.endDate = entity.getEndDate();
			this.createdAt = entity.getCreatedAt();
			this.modifiedAt = entity.getModifiedAt();
			this.visibility = entity.getVisibility();
			return this;
		}

		public MatchBuilder league(LeagueEntity entity) {
			this.league = League.builder().entity(entity).region(entity.getRegion()).build();
			return this;
		}

		public MatchBuilder homeTeam(TeamEntity entity) {
			this.homeTeam = Team.builder().entity(entity).build();
			return this;
		}

		public MatchBuilder guestTeam(TeamEntity entity) {
			this.guestTeam = Team.builder().entity(entity).build();
			return this;
		}

		public MatchBuilder account(AccountEntity entity) {			
			this.account = entity == null ? null : Account.builder().entity(entity).build();
			return this;
		}

		public MatchBuilder gameStyle(GameStyleEntity entity) {
			this.gameStyle = GameStyle.builder().entity(entity).build();
			return this;
		}

		public MatchBuilder players(List<PlayerEntity> players) {
			this.homePlayers = new LinkedList<Player>();
			this.guestPlayers = new LinkedList<Player>();
			players.forEach(p -> {
				if (p.isHomeTeam())
					homePlayers.add(Player.builder().entity(p).build());
				else
					guestPlayers.add(Player.builder().entity(p).build());
			});
			return this;
		}

		public MatchBuilder doubles(List<DoublesEntity> doubles) {
			this.homeDoubles = new LinkedList<Doubles>();
			this.guestDoubles = new LinkedList<Doubles>();
			doubles.forEach(p -> {
				if (p.isHomeTeam())
					homeDoubles.add(Doubles.builder().entity(p).build());
				else
					guestDoubles.add(Doubles.builder().entity(p).build());
			});
			return this;
		}

		public MatchBuilder games(List<GameEntity> games) throws InvalidGameSetFormat {
			this.games = new LinkedList<Game>();
			for (GameEntity game : games) {
				this.games.add(Game.builder().entity(game).players(game).doubles(game).build());
			}
			return this;
		}
	}
}