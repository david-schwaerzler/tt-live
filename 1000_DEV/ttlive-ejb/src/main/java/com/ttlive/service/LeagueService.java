package com.ttlive.service;

import java.util.LinkedList;
import java.util.List;

import javax.ejb.Stateless;

import com.ttlive.bo.League;
import com.ttlive.persistence.dao.LeagueDao;
import com.ttlive.persistence.entity.LeagueEntity;

@Stateless
public class LeagueService {

	private LeagueDao leagueDao;
	
	public LinkedList<League> findLeagues(){
		List<LeagueEntity> entities = leagueDao.findAll();
		LinkedList<League> bos = new LinkedList<League>();
		
		for(LeagueEntity entity : entities) {
			bos.add(League.builder().entity(entity).build());
		}
		return bos;
	}	
}
