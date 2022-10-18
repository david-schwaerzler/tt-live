package com.ttlive.bo;

import com.ttlive.persistence.entity.DoublesEntity;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Doubles {
	private long id;
	private int position;
	private boolean isHomeTeam;
	private String player1;
	private String player2;
	
	public static class DoublesBuilder {
		public DoublesBuilder entity(DoublesEntity entity) {
			this.id = entity.getId();
			this.position = entity.getPosition();
			this.isHomeTeam = entity.isHomeTeam();
			this.player1 = entity.getPlayer1();
			this.player2 = entity.getPlayer2();
			return this;
		}
	}
	
}
