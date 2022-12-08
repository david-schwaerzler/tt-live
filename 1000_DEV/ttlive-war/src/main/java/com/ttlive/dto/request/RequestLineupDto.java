package com.ttlive.dto.request;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RequestLineupDto {
	
	private List<RequestPlayerDto> players;
	private List<RequestDoublesDto> doubles;
	
	@Data
	@Builder
	@NoArgsConstructor
	@AllArgsConstructor
	public static class RequestPlayerDto {
		private long id;
		private String name;
	}

	@Data
	@Builder
	@NoArgsConstructor
	@AllArgsConstructor
	public static class RequestDoublesDto {
		private long id;
		private String player1;
		private String player2;
	}
}
