package com.ttlive.bo;

import java.time.LocalDateTime;
import java.util.LinkedList;
import java.util.List;

import com.ttlive.persistence.entity.LeagueEntity;
import com.ttlive.persistence.entity.RegionEntity;
import com.ttlive.persistence.entity.TeamEntity;
import com.ttlive.utils.LeagueContest;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class League {

	private long id;
	private String name;
	private LeagueContest contest;	
	private LocalDateTime createdAt;	
	private LocalDateTime modifiedAt;
	
	private Region region;
	private LinkedList<Team> teams;	
	
	
	public static class LeagueBuilder{
		
		public LeagueBuilder entity(LeagueEntity entity) {
			this.id = entity.getId();
			this.name = entity.getName();
			this.contest = entity.getContest();

			this.createdAt = entity.getCreatedAt();
			this.modifiedAt = entity.getModifiedAt();
			return this;
		}
		public LeagueBuilder region(RegionEntity entity) {
			this.region = Region.builder().entity(entity).build();
			return this;
		}
		public LeagueBuilder teams(List<TeamEntity> entities) {
			this.teams = new LinkedList<Team>();
			entities.forEach(t -> teams.add(Team.builder().entity(t).build()));
			return this;
		}
	}
}
