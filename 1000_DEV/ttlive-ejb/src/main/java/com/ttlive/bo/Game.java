package com.ttlive.bo;

import java.time.LocalDateTime;

import com.ttlive.persistence.entity.GameEntity;
import com.ttlive.utils.MatchState;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Game {
	private long id;
	private int gameNumber;
	private boolean isDoubles;
	private String set1;
	private String set2;
	private String set3;
	private String set4;
	private String set5;
	private int homeSets;
	private int guestSets;
	private MatchState state;
	private LocalDateTime createdAt;
	private LocalDateTime modifiedAt;

	private Match match;
	private Player homePlayer;
	private Player guestPlayer;
	private Doubles homeDoubles;
	private Doubles guestDoubles;

	public static class GameBuilder {
		public GameBuilder entity(GameEntity entity) {
			this.id = entity.getId();
			this.isDoubles = entity.isDoubles();
			this.gameNumber = entity.getGameNumber();
			this.set1 = entity.getSet1();
			this.set2 = entity.getSet2();
			this.set3 = entity.getSet3();
			this.set4 = entity.getSet4();
			this.set5 = entity.getSet5();
			this.homeSets = entity.getHomeSets();
			this.guestSets = entity.getGuestSets();
			this.state = entity.getState();
			this.modifiedAt = entity.getModifiedAt();
			this.createdAt = entity.getCreatedAt();
			return this;
		}

		public GameBuilder players(GameEntity entity) {
			if (entity.getHomePlayer() != null)
				this.homePlayer = Player.builder().entity(entity.getHomePlayer()).build();
			if (entity.getGuestPlayer() != null)
				this.guestPlayer = Player.builder().entity(entity.getGuestPlayer()).build();
			return this;
		}

		public GameBuilder doubles(GameEntity entity) {
			if (entity.getHomeDoubles() != null)
				this.homeDoubles = Doubles.builder().entity(entity.getHomeDoubles()).build();
			if (entity.getGuestDoubles() != null)
				this.guestDoubles = Doubles.builder().entity(entity.getGuestDoubles()).build();
			return this;
		}
	}
}
