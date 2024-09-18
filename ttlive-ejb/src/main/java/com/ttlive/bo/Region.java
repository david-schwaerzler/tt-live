package com.ttlive.bo;

import java.util.LinkedList;
import java.util.List;

import com.ttlive.persistence.entity.LeagueEntity;
import com.ttlive.persistence.entity.RegionEntity;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Region {
	
	private long id;
	private String name;
	private String description;
	private LinkedList<League> leagues;
	
	public static class RegionBuilder {
		public RegionBuilder entity(RegionEntity entity) {
			this.id = entity.getId();
			this.name = entity.getName();
			this.description = entity.getDescription();
			return this;
		}
		
		public RegionBuilder leagues(List<LeagueEntity> entities) {
			this.leagues = new LinkedList<League>();
			entities.forEach(l -> leagues.add(League.builder().entity(l).build()));
			return this;
		}
	}
}
