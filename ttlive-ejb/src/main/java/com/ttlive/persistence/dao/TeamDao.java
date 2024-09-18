package com.ttlive.persistence.dao;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.TypedQuery;

import com.ttlive.persistence.entity.TeamEntity;
import com.ttlive.utils.BaseDao;

@Stateless
public class TeamDao extends BaseDao<TeamEntity> {

	public TeamDao() {
		super(TeamEntity.class);
	}

	public TeamEntity findBy(String club, int number, long leagueId) {

		TypedQuery<TeamEntity> query = em.createNamedQuery("Team.findByClubAndNumber", TeamEntity.class);
		query.setParameter("club", club);
		query.setParameter("number", number);
		query.setParameter("leagueId", leagueId);

		List<TeamEntity> data = query.getResultList();
		if (data.size() > 1) {
			throw new IllegalArgumentException("More than one team with club='" + club + "',number= '" + number
					+ "' and leagueId='" + leagueId + "' exists. This is not allowed");
		} else if (data.size() == 0) {
			return null;
		}
		return data.get(0);
	}

}
