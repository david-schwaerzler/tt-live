package com.ttlive.bo;

import java.util.LinkedList;
import java.util.List;

import com.ttlive.persistence.entity.AccountFilterEntity;
import com.ttlive.persistence.entity.AccountFilterSetEntity;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AccountFilterSet {
	private long id;
	private String name;
	private boolean isActive;
	private boolean isDefault;	
	private List<AccountFilter> filters;

	public static class AccountFilterSetBuilder {

		public AccountFilterSetBuilder entity(AccountFilterSetEntity entity) {
			this.id = entity.getId();
			this.name = entity.getName();
			this.isActive = entity.isActive();
			this.isDefault = entity.isDefault();
			return this;
		}

		public AccountFilterSetBuilder filterEntities(List<AccountFilterEntity> filterEntities) {

			this.filters = new LinkedList<>();
			for (AccountFilterEntity entity : filterEntities) {
				filters.add(AccountFilter.builder().entity(entity).build());
			}

			return this;
		}

	}
}
