package com.ttlive.bo.request;

import java.time.LocalDateTime;

import com.ttlive.utils.MatchVisibility;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RequestMatch {
	private long gameStyleId;
	private RequestLeague league;
	private RequestTeam homeTeam;
	private RequestTeam guestTeam;
	private MatchVisibility visibility;
	private LocalDateTime startDate;
	private LocalDateTime endDate;
	private String accountUsername;
}
