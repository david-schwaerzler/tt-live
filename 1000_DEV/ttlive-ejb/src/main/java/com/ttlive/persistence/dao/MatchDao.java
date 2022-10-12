package com.ttlive.persistence.dao;

import javax.ejb.Stateless;

import com.ttlive.persistence.entity.MatchEntity;
import com.ttlive.utils.BaseDao;

@Stateless
public class MatchDao extends BaseDao<MatchEntity>{
	public MatchDao() {
		super(MatchEntity.class);
	}	
}
