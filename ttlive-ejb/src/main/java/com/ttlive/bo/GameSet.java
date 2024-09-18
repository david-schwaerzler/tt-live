package com.ttlive.bo;

import com.ttlive.utils.MatchState;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GameSet {
	private int number;
	private MatchState state;
	private int homeScore;
	private int guestScore;

	public static class GameSetBuilder {

		public GameSetBuilder set(String set, int number) throws InvalidGameSetFormat {

			this.number = number;

			if (set == null) {
				this.state = MatchState.NOT_STARTED;
				this.homeScore = 0;
				this.guestScore = 0;
				return this;
			}

			String[] parts = set.split(":");
			if (parts.length != 2) {
				throw new InvalidGameSetFormat("Can't create GameSet. Invalid input set='" + set + "'");
			}

			try {
				this.homeScore = Integer.parseInt(parts[0]);
				this.guestScore = Integer.parseInt(parts[1]);
			} catch (Exception e) {
				throw new InvalidGameSetFormat("Can't create GameSet. Error parsing scores. set='" + set + "'");
			}

			if ((homeScore == -1 || homeScore == 0) && (guestScore == -1 || guestScore == 0)) {
				this.state = MatchState.NOT_STARTED;
				return this;
			}

			if (Math.abs(homeScore - guestScore) >= 2) { // at least two points difference
				if (homeScore >= 11 || guestScore >= 11) { // at least one has over 11 points
					this.state = MatchState.FINISHED;
					return this;
				}
			}

			this.state = MatchState.LIVE;
			return this;
		}
	}

	@Override
	public String toString() {
		return homeScore + ":" + guestScore;
	}

	public static class InvalidGameSetFormat extends Exception {
		private static final long serialVersionUID = 8863935725727313984L;

		public InvalidGameSetFormat(String message) {
			super(message);
		}
	}
}
