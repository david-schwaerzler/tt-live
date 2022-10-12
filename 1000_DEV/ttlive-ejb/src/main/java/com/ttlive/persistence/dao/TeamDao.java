package com.ttlive.persistence.dao;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.TypedQuery;

import com.ttlive.persistence.entity.TeamEntity;
import com.ttlive.utils.BaseDao;
import com.ttlive.utils.LeagueContest;

@Stateless
public class TeamDao extends BaseDao<TeamEntity>{

	public TeamDao() {
		super(TeamEntity.class);
	}
	
	public TeamEntity findByFullName(String fullName, LeagueContest contest) {		
		
		TypedQuery<TeamEntity> query = em.createNamedQuery("Team.findByName", TeamEntity.class);
		query.setParameter("name", fullName);
		query.setParameter("contest", contest);

		List<TeamEntity> data = query.getResultList();
		if (data.size() > 1) {
			throw new IllegalArgumentException("More than one team with Name '" + fullName + "' exists. This is not allowed");
		} else if (data.size() == 0) {
			return null;
		}
		return data.get(0);		
	}

}
