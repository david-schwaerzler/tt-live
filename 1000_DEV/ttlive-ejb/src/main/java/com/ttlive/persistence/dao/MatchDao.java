package com.ttlive.persistence.dao;

import java.util.HashSet;
import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.TypedQuery;

import com.ttlive.persistence.entity.MatchEntity;
import com.ttlive.utils.BaseDao;

@Stateless
public class MatchDao extends BaseDao<MatchEntity> {
	public MatchDao() {
		super(MatchEntity.class);
	}

	public HashSet<String> getAllCodes() {
		HashSet<String> codes = new HashSet<String>();
		TypedQuery<Object[]> query = em.createNamedQuery("Match.findCodes", Object[].class);

		List<Object[]> tmp = query.getResultList();
		tmp.forEach(array -> {
			if(array[0] != null)
				codes.add((String)array[0]);
			if(array[1] != null)
			codes.add((String)array[1]);
		});
		return codes;
	}	
}
