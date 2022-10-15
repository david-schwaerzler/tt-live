package com.ttlive.service;

import java.util.LinkedList;
import java.util.List;

import javax.ejb.EJB;
import javax.ejb.Stateless;

import com.ttlive.bo.Player;
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
	
	public LinkedList<Player> findPlayers(long teamId){
		TeamEntity team = teamDao.findById(teamId);
		if(team == null)
			throw new NullPointerException("Team with the id='" + teamId + "' doesn't exist");
		
		LinkedList<Player> players = new LinkedList<Player>();
		team.getPlayers().forEach(p ->players.add(Player.builder().entity(p).build()));
		return players;
	}
	
	public LinkedList<Team> getDefault(List<TeamEntity> entities){		
		LinkedList<Team> teams = new LinkedList<Team>();
		entities.forEach(e -> teams.add(Team.builder().entity(e).build()));
		return teams;
	}

}
