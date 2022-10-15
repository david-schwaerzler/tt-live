package com.ttlive.dto;

import java.util.LinkedList;
import java.util.List;

import com.ttlive.bo.Team;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TeamDto {

	private long id;
	private String club;
	private int number;
	
	
	public static class TeamDtoBuilder {
		public TeamDtoBuilder bo(Team bo) {
			this.id = bo.getId();
			this.club = bo.getClub();
			this.number = bo.getNumber();			
			return this;			
		}		
	}
	
	public static LinkedList<TeamDto> fromBos(List<Team> bos){
		LinkedList<TeamDto> dtos = new LinkedList<TeamDto>();
		bos.forEach(bo -> dtos.add(TeamDto.builder().bo(bo).build()));
		return dtos;
	}
	
}
