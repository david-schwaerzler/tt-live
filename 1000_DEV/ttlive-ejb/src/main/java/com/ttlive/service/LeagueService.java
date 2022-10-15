package com.ttlive.service;

import java.util.LinkedList;
import java.util.List;

import javax.ejb.EJB;
import javax.ejb.Stateless;

import com.ttlive.bo.League;
import com.ttlive.bo.Team;
import com.ttlive.persistence.dao.LeagueDao;
import com.ttlive.persistence.entity.LeagueEntity;

@Stateless
public class LeagueService {

	@EJB
	private LeagueDao leagueDao;
	
	public LinkedList<League> findAll(){
		List<LeagueEntity> leagues = leagueDao.findAll();
		return getDefault(leagues);
	}	
	
	public LinkedList<Team> findTeams(long leagueId){
		LeagueEntity league = leagueDao.findById(leagueId);
		if(league == null) 
			throw new NullPointerException("League wiht id='" + leagueId + "' doesn't exist");			
		
		LinkedList<Team> teams = new LinkedList<Team>();
		league.getTeams().forEach(t -> teams.add(Team.builder().entity(t).build()));
		return teams;		
	}
	
	
	private LinkedList<League> getDefault(List<LeagueEntity> entities){
		LinkedList<League> bos = new LinkedList<League>();
		entities.forEach(e -> bos.add(League.builder().entity(e).build()));
		return bos;
	}
}
