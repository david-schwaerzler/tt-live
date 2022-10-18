package com.ttlive.service;

import java.util.LinkedList;
import java.util.List;

import javax.ejb.EJB;
import javax.ejb.Stateless;

import com.ttlive.bo.Team;
import com.ttlive.persistence.dao.TeamDao;
import com.ttlive.persistence.entity.TeamEntity;

@Stateless
public class TeamService {
	
	@EJB
	private TeamDao teamDao;
	
	public LinkedList<Team> findAll(){
		List<TeamEntity> teams = teamDao.findAll();
		return getDefault(teams);		
	}
	
	
	
	public LinkedList<Team> getDefault(List<TeamEntity> entities){		
		LinkedList<Team> teams = new LinkedList<Team>();
		entities.forEach(e -> teams.add(Team.builder().entity(e).build()));
		return teams;
	}

}
