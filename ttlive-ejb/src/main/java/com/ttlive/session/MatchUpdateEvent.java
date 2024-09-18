package com.ttlive.session;

import com.ttlive.bo.Match;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class MatchUpdateEvent {
	private long matchId;
	private Match match;
}
