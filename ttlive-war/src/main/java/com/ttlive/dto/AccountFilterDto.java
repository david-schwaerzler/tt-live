package com.ttlive.dto;

import java.util.LinkedList;
import java.util.List;

import com.ttlive.bo.AccountFilter;
import com.ttlive.utils.AccountFilterType;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AccountFilterDto {
	private long id;
	private AccountFilterType type;
	private String value;
	
	public static class AccountFilterDtoBuilder {
		public AccountFilterDtoBuilder bo(AccountFilter bo) {
			this.id = bo.getId();
			this.type = bo.getType();
			this.value = bo.getValue();
			return this;
		}
	}
	
	public LinkedList<AccountFilterDto> fromBos(List<AccountFilter> bos){
		LinkedList<AccountFilterDto> ret = new LinkedList<>();
		for(AccountFilter bo : bos) {
			ret.add(AccountFilterDto.builder().bo(bo).build());
		}
		return ret;
	}
}
