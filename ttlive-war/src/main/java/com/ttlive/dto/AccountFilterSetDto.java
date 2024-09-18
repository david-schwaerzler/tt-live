package com.ttlive.dto;

import java.util.LinkedList;
import java.util.List;

import com.ttlive.bo.AccountFilter;
import com.ttlive.bo.AccountFilterSet;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AccountFilterSetDto {
	private long id;
	private String name;
	private boolean isActive;
	private boolean isDefault;
	private List<AccountFilterDto> filters;

	public static class AccountFilterSetDtoBuilder {

		public AccountFilterSetDtoBuilder bo(AccountFilterSet bo) {
			this.id = bo.getId();
			this.name = bo.getName();
			this.isActive = bo.isActive();
			this.isDefault = bo.isDefault();
			
			this.filters = new LinkedList<>();
			for (AccountFilter filterBo : bo.getFilters()) {
				filters.add(AccountFilterDto.builder().bo(filterBo).build());
			}
			return this;
		}
	}
	
	public static LinkedList<AccountFilterSetDto> fromBos(List<AccountFilterSet> bos){
		LinkedList<AccountFilterSetDto> ret = new LinkedList<>();
		for(AccountFilterSet bo : bos) {
			ret.add(AccountFilterSetDto.builder().bo(bo).build());
		}
		return ret;
	}
}
