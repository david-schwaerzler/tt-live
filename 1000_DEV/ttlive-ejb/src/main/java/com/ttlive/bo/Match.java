package com.ttlive.bo;

import java.time.LocalDateTime;

import com.ttlive.persistence.entity.AccountEntity;
import com.ttlive.persistence.entity.GameStyleEntity;
import com.ttlive.persistence.entity.LeagueEntity;
import com.ttlive.persistence.entity.MatchEntity;
import com.ttlive.persistence.entity.TeamEntity;

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
	private String homePlayers;
	private String guestPlayers;
	private LocalDateTime createdAt;
	private LocalDateTime modifiedAt;
	
	private League league;
	private Team homeTeam;
	private Team guestTeam;
	private Account account;
	private GameStyle gameStyle;
	
	public static class MatchBuilder {
		public MatchBuilder entity(MatchEntity entity) {
			this.id = entity.getId();
			this.title = entity.getTitle();
			this.description = entity.getDescription();
			this.homeTeamScore = entity.getHomeTeamScore();
			this.guestTeamScore = entity.getGuestTeamScore();
			this.homePlayers = entity.getHomePlayers();
			this.guestPlayers = entity.getGuestPlayers();
			this.createdAt = entity.getCreatedAt();
			this.modifiedAt = entity.getModifiedAt();
			return this;
		}
		
		public MatchBuilder leagueEntity(LeagueEntity entity) {
			this.league = League.builder().entity(entity).build();
			return this;
		}
		
		public MatchBuilder homeTeamEntity(TeamEntity entity) {
			this.homeTeam = Team.builder().entity(entity).build();
			return this;
		}
		
		public MatchBuilder guestTeamEntity(TeamEntity entity) {
			this.homeTeam = Team.builder().entity(entity).build();
			return this;
		}
		
		public MatchBuilder accountEntity(AccountEntity entity) {
			this.account = Account.builder().entity(entity).build();
			return this;
		}
		
		public MatchBuilder gameStyleEntity(GameStyleEntity entity) {
			this.gameStyle = GameStyle.builder().entity(entity).build();
			return this;
		}	
	}
}
