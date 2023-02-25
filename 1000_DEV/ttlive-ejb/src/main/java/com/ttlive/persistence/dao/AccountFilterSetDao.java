package com.ttlive.persistence.dao;

import javax.ejb.Stateless;

import com.ttlive.persistence.entity.AccountFilterSetEntity;
import com.ttlive.utils.BaseDao;

@Stateless
public class AccountFilterSetDao extends BaseDao<AccountFilterSetEntity>{

	public AccountFilterSetDao() {
		super(AccountFilterSetEntity.class);
	}

}
