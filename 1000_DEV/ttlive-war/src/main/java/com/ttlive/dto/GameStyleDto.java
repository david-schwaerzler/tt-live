package com.ttlive.dto;

import java.util.LinkedList;
import java.util.List;

import com.ttlive.bo.GameStyle;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GameStyleDto {
	private long id;
	private String name;
	private String description;	
	private String gameOrder;
	private int numPlayers;
	private int numDoubles;
	
	public static class GameStyleDtoBuilder {
		public GameStyleDtoBuilder bo(GameStyle bo) {
			this.id = bo.getId();
			this.name = bo.getName();
			this.description = bo.getDescription();
			this.gameOrder = bo.getGameOrder();
			this.numPlayers = bo.getNumPlayers();
			this.numDoubles = bo.getNumDoubles();
			return this;
		}		
	}
	
	public static LinkedList<GameStyleDto> fromBos(List<GameStyle> bos) {
		LinkedList<GameStyleDto> dtos = new LinkedList<GameStyleDto>();
		bos.forEach(bo -> dtos.add(GameStyleDto.builder().bo(bo).build()));
		return dtos;
	}
}
