package com.ttlive.bo;

import com.ttlive.persistence.entity.AccountFilterEntity;
import com.ttlive.utils.AccountFilterType;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AccountFilter {
	private long id;
	private AccountFilterType type;
	private String value;
	
	public static class AccountFilterBuilder {
		public AccountFilterBuilder entity(AccountFilterEntity entity) {
			this.id = entity.getId();
			this.type = entity.getType();
			this.value = entity.getValue();
			return this;
		}
	}
}
