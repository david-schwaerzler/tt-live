package com.ttlive.bo.request;

import com.ttlive.utils.LeagueContest;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RequestLeague {
	private long id;
	private String name;
	private LeagueContest contest;
	private long regionId;
}
