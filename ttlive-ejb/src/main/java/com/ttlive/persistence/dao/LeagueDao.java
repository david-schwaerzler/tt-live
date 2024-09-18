package com.ttlive.persistence.dao;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.TypedQuery;

import com.ttlive.persistence.entity.LeagueEntity;
import com.ttlive.utils.BaseDao;
import com.ttlive.utils.LeagueContest;

@Stateless
public class LeagueDao extends BaseDao<LeagueEntity> {

	public LeagueDao() {
		super(LeagueEntity.class);
	}

	public LeagueEntity findBy(String name, LeagueContest contest, long regionId) {
		TypedQuery<LeagueEntity> query = em.createNamedQuery("League.findByNameContestAndRegion", LeagueEntity.class);
		query.setParameter("contest", contest);
		query.setParameter("name", name);
		query.setParameter("regionId", regionId);

		List<LeagueEntity> entities = query.getResultList();
		if (entities.size() > 1) {
			throw new IllegalArgumentException("More than one League with name='" + name + "', contest= '" + contest
					+ "' and regionId='" + regionId + "' exists. This is not allowed");
		} else if (entities.size() == 0) {
			return null;
		}
		return entities.get(0);
	}

}
