package com.ttlive.bo.request;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RequestMatch {
	private long gameStyleId;
	private RequestLeague league;
	private RequestTeam homeTeam;
	private RequestTeam guestTeam;
	private LocalDateTime startDate;
	private String accountUsername;
}
