package com.ttlive.dto.request;

import java.time.ZonedDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RequestMatchDto {
	private Long gameStyleId;
	private RequestLeagueDto league;
	private RequestTeamDto homeTeam;
	private RequestTeamDto guestTeam;
	private ZonedDateTime startDate;
}
