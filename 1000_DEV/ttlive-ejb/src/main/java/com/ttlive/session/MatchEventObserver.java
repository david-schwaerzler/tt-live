package com.ttlive.session;

import javax.ejb.Local;
import javax.ejb.Stateless;
import javax.enterprise.event.Event;
import javax.inject.Inject;

import com.ttlive.bo.Game;
import com.ttlive.bo.Match;

@Stateless
@Local
public class MatchEventObserver {
	
	@Inject
	private Event<GameUpdateEvent> gameEvents;
	
	@Inject
	private Event<MatchUpdateEvent> matchEvents;
	
	public void fireGameEvent(long matchId, Game game) {
		GameUpdateEvent event = new GameUpdateEvent(matchId, game);
		gameEvents.fireAsync(event);
	}
	
	public void fireMatchEvent(Match match) {
		MatchUpdateEvent event = new MatchUpdateEvent(match.getId(), match);
		matchEvents.fireAsync(event);
	}
}
