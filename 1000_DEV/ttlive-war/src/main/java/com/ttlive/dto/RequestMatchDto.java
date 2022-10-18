package com.ttlive.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RequestMatchDto {
	private long regionId;
	private String contest;
	private long gameStyleId;
	private LeagueDto league;
	private TeamDto homeTeam;
	private TeamDto guestTeam;	
}
