package com.ttlive.persistence.dao;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.NonUniqueResultException;
import javax.persistence.TypedQuery;

import com.ttlive.persistence.entity.AccountEntity;
import com.ttlive.utils.BaseDao;

@Stateless
public class AccountDao extends BaseDao<AccountEntity>{

	public AccountDao() {
		super(AccountEntity.class);
	}
	
	public AccountEntity findByName(String username) {
		TypedQuery<AccountEntity> query = em.createNamedQuery("Account.findByName", AccountEntity.class);
		query.setParameter("name", username);
		
		List<AccountEntity> accounts = query.getResultList();
		if(accounts.size() == 0)
			return null;
		else if(accounts.size() > 1) {
			throw new NonUniqueResultException("More than one account exists with thse username='" + username + "'. The username should be unique");
		}
		
		return accounts.get(0);
	}
}
