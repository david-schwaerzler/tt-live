package com.ttlive.persistence.dao;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.TypedQuery;

import com.ttlive.persistence.entity.LeagueEntity;
import com.ttlive.utils.BaseDao;
import com.ttlive.utils.LeagueContest;

@Stateless
public class LeagueDao extends BaseDao<LeagueEntity>{

	public LeagueDao() {
		super(LeagueEntity.class);
	}
	
	public List<LeagueEntity> loadByContest(LeagueContest contest) {
		TypedQuery<LeagueEntity> query = em.createNamedQuery("League.findByContest", LeagueEntity.class);
		query.setParameter("contest", contest);
		return query.getResultList();
	}

}
