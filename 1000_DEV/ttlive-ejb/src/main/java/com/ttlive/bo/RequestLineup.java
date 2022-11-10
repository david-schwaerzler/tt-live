package com.ttlive.bo;

import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RequestLineup {
	
	private List<RequestPlayer> players;
	private List<RequestDoubles> doubles;
	
	@Data
	@Builder
	public static class RequestPlayer {
		private long id;
		private String name;
	}

	@Data
	@Builder
	public static class RequestDoubles {
		private long id;
		private String player1;
		private String player2;
	}


}
