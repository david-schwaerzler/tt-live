package com.ttlive.bo;

import java.time.LocalDateTime;

import com.ttlive.utils.LeagueContest;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RequestMatch {
	private long regionId;
	private LeagueContest contest;
	private long gameStyleId;
	private League league;
	private Team homeTeam;
	private Team guestTeam;
	private LocalDateTime startDate;
}
