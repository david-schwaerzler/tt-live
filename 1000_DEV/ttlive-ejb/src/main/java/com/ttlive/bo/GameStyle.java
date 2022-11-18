package com.ttlive.bo;

import javax.persistence.Column;

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
	private int numPlayers;
	private int numDoubles;
	private int gamesToFinish;
	private boolean isFinishingEarly;

	
	public static class GameStyleBuilder {
		public GameStyleBuilder entity(GameStyleEntity entity) {
			this.id = entity.getId();
			this.name = entity.getName();
			this.description = entity.getDescription();
			this.gameOrder = entity.getGameOrder();
			this.numPlayers = entity.getNumPlayers();
			this.numDoubles = entity.getNumDoubles();			
			this.gamesToFinish = entity.getGamesToFinish();
			this.isFinishingEarly = entity.isFinishingEarly();
			return this;
		}
		
	}
}
