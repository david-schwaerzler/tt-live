package com.ttlive.dto;

import java.util.LinkedList;
import java.util.List;

import com.ttlive.bo.League;
import com.ttlive.utils.LeagueContest;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class LeagueDto {
	private long id;
	private String name;
	private String region;
	private String link;
	private LeagueContest contest;	
	
	public static class LeagueDtoBuilder {
		public LeagueDtoBuilder bo(League league) {
			this.id = league.getId();			
			this.name = league.getName();
			this.region = league.getRegion();
			this.link = league.getRegion();
			return this;
		}
	}
	
	
	public static LinkedList<LeagueDto> fromBos(List<League> leagues) {
		LinkedList<LeagueDto> dtos = new LinkedList<LeagueDto>();
		for(League league : leagues) {
			dtos.add(LeagueDto.builder().bo(league).build());			
		}
		return dtos;
	}
}
