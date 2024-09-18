package com.ttlive.dto;

import java.util.LinkedList;
import java.util.List;

import com.ttlive.bo.GameSet;
import com.ttlive.utils.MatchState;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GameSetDto {
	
	private int number;
	private MatchState state;
	private int homeScore;
	private int guestScore;

	public static class GameSetDtoBuilder {
		public GameSetDtoBuilder bo(GameSet bo) {
			this.number = bo.getNumber();
			this.state = bo.getState();
			this.homeScore = bo.getHomeScore();
			this.guestScore = bo.getGuestScore();
			return this;
		}
	}
	
	public static LinkedList<GameSetDto> fromBos(List<GameSet> bos){
		LinkedList<GameSetDto> dtos = new LinkedList<GameSetDto>();
		for(GameSet bo : bos)
			dtos.add(GameSetDto.builder().bo(bo).build());
		return dtos;
	}

}
