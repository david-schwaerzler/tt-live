package com.ttlive.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RequestLeagueDto {
	private long id;
	private String name;
	private String contest;
	private long regionId;
}
