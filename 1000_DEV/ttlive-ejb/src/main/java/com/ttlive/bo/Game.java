package com.ttlive.bo;

import java.time.LocalDateTime;

import com.ttlive.persistence.entity.GameEntity;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Game {
	private long id;
	private int gameNumber;
	private int homePlayerNumber;
	private int guestPlayerNumber;
	private String homePlayer;
	private String guestPlayer;
	private boolean isDouble;
	private String set1;
	private String set2;
	private String set3;
	private String set4;
	private String set5;
	private LocalDateTime createdAt;
	private LocalDateTime modifiedAt;
	
	private Match match;

	public static class GameBuilder {
		public GameBuilder entity(GameEntity entity) {
			this.id = entity.getId();
			this.homePlayerNumber = entity.getHomePlayerNumber();
			this.guestPlayerNumber = entity.getGuestPlayerNumber();
			this.gameNumber = entity.getGameNumber();
			this.homePlayer = entity.getHomePlayer();
			this.guestPlayer = entity.getGuestPlayer();
			this.isDouble = entity.isDouble();
			this.set1 = entity.getSet1();
			this.set2 = entity.getSet2();
			this.set3 = entity.getSet3();
			this.set4 = entity.getSet4();
			this.set5 = entity.getSet5();
			this.modifiedAt = entity.getModifiedAt();
			this.createdAt = entity.getCreatedAt();
			return this;
		}
	}
}
