package com.ttlive.bo;

import java.time.LocalDateTime;
import java.util.LinkedList;

import com.ttlive.bo.GameSet.InvalidGameSetFormat;
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
	private LinkedList<GameSet> sets;
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
		public GameBuilder entity(GameEntity entity) throws InvalidGameSetFormat {
			this.id = entity.getId();
			this.isDoubles = entity.isDoubles();
			this.gameNumber = entity.getGameNumber();
			this.homeSets = entity.getHomeSets();
			this.guestSets = entity.getGuestSets();
			this.state = entity.getState();
			this.modifiedAt = entity.getModifiedAt();
			this.createdAt = entity.getCreatedAt();

			this.sets = new LinkedList<GameSet>();
			this.sets.add(GameSet.builder().set(entity.getSet1(), 1).build());
			this.sets.add(GameSet.builder().set(entity.getSet2(), 2).build());
			this.sets.add(GameSet.builder().set(entity.getSet3(), 3).build());
			this.sets.add(GameSet.builder().set(entity.getSet4(), 4).build());
			this.sets.add(GameSet.builder().set(entity.getSet5(), 5).build());

			// set all set to NOT_STARTED after a previous set has the state NOT_STARTED
			// this happens when a set in the middle of a match is reverted.
			boolean isNotStarted = false;
			int homeScore = 0;
			int guestScore = 0;

			for (GameSet set : sets) {

				if (set.getState() == MatchState.FINISHED) {
					homeScore = set.getHomeScore() > set.getGuestScore() ? homeScore + 1 : homeScore;
					guestScore = set.getGuestScore() > set.getHomeScore() ? guestScore + 1 : guestScore;
				}

				if (isNotStarted)
					set.setState(MatchState.NOT_STARTED);

				if (set.getState() == MatchState.NOT_STARTED)
					isNotStarted = true;

				if (homeScore >= 3 || guestScore >= 3)
					isNotStarted = true;
			}
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
