package com.ttlive.dto;

import java.util.LinkedList;
import java.util.List;

import com.ttlive.bo.Region;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class RegionDto {
	
	private long id;
	private String name;
	private String description;
	
	public static class RegionDtoBuilder {
		public RegionDtoBuilder bo(Region bo) {
			this.id = bo.getId();
			this.name = bo.getName();
			this.description = bo.getDescription();
			return this;
		}
	}
	
	public static LinkedList<RegionDto> fromBos(List<Region> bos){
		LinkedList<RegionDto> dtos = new LinkedList<RegionDto>();
		bos.forEach(r -> dtos.add(RegionDto.builder().bo(r).build()));
		return dtos;
	}

}
