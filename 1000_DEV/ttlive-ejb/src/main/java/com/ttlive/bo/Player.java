package com.ttlive.bo;

import java.time.LocalDateTime;

import com.ttlive.persistence.entity.PlayerEntity;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Player {
	private long id;
	private String name;
	private int position;
	private boolean isHomeTeam;	
	
	private LocalDateTime createdAt;
	private LocalDateTime modifiedAt;
	
	public static class PlayerBuilder {
		public PlayerBuilder entity(PlayerEntity entity) {
			this.id = entity.getId();
			this.name = entity.getName();
			this.position = entity.getPosition();
			this.isHomeTeam = entity.isHomeTeam();
			this.createdAt = entity.getCreatedAt();
			this.modifiedAt = entity.getModifiedAt();
			return this;
		}		
	}
	
}
