package com.ttlive.session;

import com.ttlive.bo.Game;
import com.ttlive.bo.Match;

public interface MatchActionHandler {
	public void emitUpdateGame(long matchId, Game game);
	public void emitUpdateMatch(Match match);

}
