package com.ttlive.session;

import com.ttlive.bo.Game;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GameUpdateEvent {
	private long matchId;
	private Game game;
}
