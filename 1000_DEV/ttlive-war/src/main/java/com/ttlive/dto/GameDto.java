package com.ttlive.dto;

import java.time.LocalDateTime;
import java.util.LinkedList;
import java.util.List;

import com.ttlive.bo.Game;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GameDto {
	private long id;
	private int gameNumber;
	private int homePlayerNumber;
	private int guestPlayerNumber;
	private String homePlayer;
	private String guestPlayer;
	private boolean isDouble;
	private String set1;
	private String set2;
	private String set3;
	private String set4;
	private String set5;
	private LocalDateTime modifiedAt;
	
	public static class GameDtoBuilder {
		public GameDtoBuilder bo(Game bo) {
			this.id = bo.getId();
			this.homePlayerNumber = bo.getHomePlayerNumber();
			this.guestPlayerNumber = bo.getGuestPlayerNumber();
			this.gameNumber = bo.getGameNumber();
			this.homePlayer = bo.getHomePlayer();
			this.guestPlayer = bo.getGuestPlayer();
			this.isDouble = bo.isDouble();
			this.set1 = bo.getSet1();
			this.set2 = bo.getSet2();
			this.set3 = bo.getSet3();
			this.set4 = bo.getSet4();
			this.set5 = bo.getSet5();
			this.modifiedAt = bo.getModifiedAt();
			return this;
		}
	}
	
	public static LinkedList<GameDto> fromBos(List<Game> bos){
		LinkedList<GameDto> dtos = new LinkedList<GameDto>();
		bos.forEach(bo -> dtos.add(GameDto.builder().bo(bo).build()));
		return dtos;
	}
}
