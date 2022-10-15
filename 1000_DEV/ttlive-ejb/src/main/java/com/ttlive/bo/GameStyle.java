package com.ttlive.bo;

import com.ttlive.persistence.entity.GameStyleEntity;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GameStyle {
	private long id;
	private String name;
	private String description;	
	private String gameOrder;
	
	public static class GameStyleBuilder {
		public GameStyleBuilder entity(GameStyleEntity entity) {
			this.id = entity.getId();
			this.name = entity.getName();
			this.description = entity.getDescription();
			this.gameOrder = entity.getGameOrder();
			return this;
		}
		
	}
}
