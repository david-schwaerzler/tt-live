package com.ttlive.bo.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RequestTeam {
	private long id;
	private String club;
	private int number;
}
