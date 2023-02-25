package com.ttlive.persistence.dao;

import javax.ejb.Stateless;

import com.ttlive.persistence.entity.AccountFilterEntity;
import com.ttlive.utils.BaseDao;

@Stateless
public class AccountFilterDao extends BaseDao<AccountFilterEntity> {

	public AccountFilterDao() {
		super(AccountFilterEntity.class);
	}

}
