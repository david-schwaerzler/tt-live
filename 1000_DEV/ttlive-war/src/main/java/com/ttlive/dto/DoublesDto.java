package com.ttlive.dto;

import java.util.LinkedList;
import java.util.List;

import com.ttlive.bo.Doubles;
import com.ttlive.utils.MatchState;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DoublesDto {
	private long id;
	private int position;
	private boolean isHomeTeam;
	private String player1;
	private String player2;
	private MatchState state;
	
	public static class DoublesDtoBuilder {
		public DoublesDtoBuilder bo(Doubles bo) {
			this.id = bo.getId();
			this.position = bo.getPosition();
			this.isHomeTeam = bo.isHomeTeam();
			this.player1 = bo.getPlayer1();
			this.player2 = bo.getPlayer2();
			this.state = bo.getState();
			return this;
		}
	}
	
	public static LinkedList<DoublesDto> fromBos(List<Doubles> doubles){
		LinkedList<DoublesDto> dtos = new LinkedList<DoublesDto>();
		doubles.forEach(d -> dtos.add(DoublesDto.builder().bo(d).build()));
		return dtos;
	}
	
}
