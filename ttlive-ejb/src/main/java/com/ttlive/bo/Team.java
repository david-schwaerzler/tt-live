package com.ttlive.bo;

import java.time.LocalDateTime;
import java.util.LinkedList;
import java.util.List;

import com.ttlive.persistence.entity.LeagueEntity;
import com.ttlive.persistence.entity.MatchEntity;
import com.ttlive.persistence.entity.PlayerEntity;
import com.ttlive.persistence.entity.TeamEntity;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Team {
	private long id;
	private String club;
	private int number;
	private League league;
	private List<Player> players;
	private List<Match> matches;
	private LocalDateTime createdAt;
	private LocalDateTime modifiedAt;
	
	public static class TeamBuilder {
		public TeamBuilder entity(TeamEntity entity) {
			this.id = entity.getId();
			this.club = entity.getClub();
			this.number = entity.getNumber();
			this.createdAt = entity.getCreatedAt();
			this.modifiedAt = entity.getModifiedAt();			
			return this;			
		}
		
		public TeamBuilder league(LeagueEntity league) {
			this.league = League.builder().entity(league).build();
			return this;
		}
		
		public TeamBuilder players(List<PlayerEntity> entities) {
			this.players = new LinkedList<Player>();
			entities.forEach(p -> players.add(Player.builder().entity(p).build()));
			return this;
		}
		
		public TeamBuilder matches(List<MatchEntity> homeMatches, List<MatchEntity> guestMatches) {
			this.matches = new LinkedList<Match>();
			homeMatches.forEach(m -> matches.add(Match.builder().entity(m).build()));
			guestMatches.forEach(m -> matches.add(Match.builder().entity(m).build()));
			return this;
		}
	}
}
