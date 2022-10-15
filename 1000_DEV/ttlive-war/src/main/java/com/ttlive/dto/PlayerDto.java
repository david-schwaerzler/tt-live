package com.ttlive.dto;

import java.util.LinkedList;
import java.util.List;

import com.ttlive.bo.Player;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PlayerDto {
	private long id;
	private String name;

	public static class PlayerDtoBuilder {
		public PlayerDtoBuilder bo(Player bo) {
			this.id = bo.getId();
			this.name = bo.getName();
			return this;
		}
	}

	public static LinkedList<PlayerDto> fromBos(List<Player> bos){
		LinkedList<PlayerDto> dtos = new LinkedList<PlayerDto>();
		bos.forEach(bo -> dtos.add(PlayerDto.builder().bo(bo).build()));
		return dtos;
	}
}