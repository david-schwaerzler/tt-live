package com.ttlive.service;

import java.util.LinkedList;
import java.util.List;

import javax.ejb.EJB;
import javax.ejb.Stateless;

import com.ttlive.bo.Player;
import com.ttlive.persistence.dao.PlayerDao;
import com.ttlive.persistence.dao.TeamDao;
import com.ttlive.persistence.entity.PlayerEntity;

@Stateless
public class PlayerService {
	
	@EJB
	private PlayerDao playerDao;
	
	@EJB
	private TeamDao teamDao;
	
	public LinkedList<Player> findAll(){
		List<PlayerEntity> players = playerDao.findAll();
		return getDefault(players);
	}
	
	
	public LinkedList<Player> getDefault(List<PlayerEntity> entities){
		LinkedList<Player> players = new LinkedList<Player>();
		entities.forEach(e -> players.add(Player.builder().entity(e).build()));
		return players;		
	}
	
	

}
