package com.ttlive.dto;

import java.time.LocalDateTime;
import java.util.LinkedList;
import java.util.List;

import com.ttlive.bo.Game;
import com.ttlive.utils.MatchState;

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
	private boolean isDoubles;
	private String set1;
	private String set2;
	private String set3;
	private String set4;
	private String set5;
	private int homeSets;
	private int guestSets;
	private MatchState state;
	private LocalDateTime modifiedAt;

	private PlayerDto homePlayer;
	private PlayerDto guestPlayer;

	private DoublesDto homeDoubles;
	private DoublesDto guestDoubles;

	public static class GameDtoBuilder {
		public GameDtoBuilder bo(Game bo) {
			this.id = bo.getId();
			this.gameNumber = bo.getGameNumber();
			this.isDoubles = bo.isDoubles();
			this.set1 = bo.getSet1();
			this.set2 = bo.getSet2();
			this.set3 = bo.getSet3();
			this.set4 = bo.getSet4();
			this.set5 = bo.getSet5();
			this.homeSets = bo.getHomeSets();
			this.guestSets = bo.getGuestSets();
			this.state = bo.getState();
			this.modifiedAt = bo.getModifiedAt();

			if (bo.getHomePlayer() != null)
				this.homePlayer = PlayerDto.builder().bo(bo.getHomePlayer()).build();
			if (bo.getGuestPlayer() != null)
				this.guestPlayer = PlayerDto.builder().bo(bo.getGuestPlayer()).build();
			if (bo.getHomeDoubles() != null)
				this.homeDoubles = DoublesDto.builder().bo(bo.getHomeDoubles()).build();
			if (bo.getGuestDoubles() != null)
				this.guestDoubles = DoublesDto.builder().bo(bo.getGuestDoubles()).build();

			return this;
		}
	}

	public static LinkedList<GameDto> fromBos(List<Game> bos) {
		LinkedList<GameDto> dtos = new LinkedList<GameDto>();
		bos.forEach(bo -> dtos.add(GameDto.builder().bo(bo).build()));
		return dtos;
	}
}
