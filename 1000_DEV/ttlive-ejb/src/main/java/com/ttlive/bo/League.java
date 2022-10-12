package com.ttlive.bo;

import java.time.LocalDateTime;

import com.ttlive.persistence.entity.LeagueEntity;
import com.ttlive.utils.LeagueContest;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class League {

	private long id;
	private String name;
	private String region;
	private String link;
	private LeagueContest contest;
	private LocalDateTime createdAt;	
	private LocalDateTime modifiedAt;
	
	
	public static class LeagueBuilder{
		
		public LeagueBuilder entity(LeagueEntity entity) {
			this.id = entity.getId();
			this.name = entity.getName();
			this.region = entity.getRegion();
			this.link = entity.getLink();
			this.contest = entity.getContest();
			this.createdAt = entity.getCreatedAt();
			this.modifiedAt = entity.getModifiedAt();
			return this;
		}		
	}
}
