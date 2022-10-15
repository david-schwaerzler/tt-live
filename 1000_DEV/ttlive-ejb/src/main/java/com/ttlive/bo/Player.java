package com.ttlive.bo;

import java.time.LocalDateTime;

import com.ttlive.persistence.entity.PlayerEntity;
import com.ttlive.persistence.entity.TeamEntity;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Player {
	private long id;
	private String name;
	private Team team;	
	private LocalDateTime createdAt;
	private LocalDateTime modifiedAt;
	
	public static class PlayerBuilder {
		public PlayerBuilder entity(PlayerEntity entity) {
			this.id = entity.getId();
			this.name = entity.getName();
			this.createdAt = entity.getCreatedAt();
			this.modifiedAt = entity.getModifiedAt();
			return this;
		}
		public PlayerBuilder teamEntity(TeamEntity teamEntity) {
			this.team = Team.builder().entity(teamEntity).build();
			return this;
		}
	}
	
}
