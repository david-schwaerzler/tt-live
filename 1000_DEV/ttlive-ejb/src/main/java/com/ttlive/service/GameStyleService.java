package com.ttlive.service;

import java.util.LinkedList;
import java.util.List;

import javax.ejb.EJB;
import javax.ejb.Stateless;

import com.ttlive.bo.Game;
import com.ttlive.bo.GameStyle;
import com.ttlive.bo.Game.GameBuilder;
import com.ttlive.persistence.dao.GameStyleDao;
import com.ttlive.persistence.entity.GameStyleEntity;

@Stateless
public class GameStyleService {
	
	private static final int HOME_IDX = 0;
	private static final int GUEST_IDX = 1;

	@EJB
	private GameStyleDao gameStyleDao;

	public LinkedList<GameStyle> findAll() {
		List<GameStyleEntity> entities = gameStyleDao.findAll();
		return getDefaults(entities);
	}

	public LinkedList<GameStyle> getDefaults(List<GameStyleEntity> entities) {
		LinkedList<GameStyle> bos = new LinkedList<GameStyle>();
		entities.forEach(e -> bos.add(GameStyle.builder().entity(e).build()));
		return bos;
	}

	public LinkedList<Game> createGames(long gameStyleId) {
		GameStyleEntity entity = gameStyleDao.findById(gameStyleId);
		if (entity == null)
			throw new NullPointerException("GameStyle with the id='" + gameStyleId + "' doesn't exist");
		return createGames(entity);
	}

	public LinkedList<Game> createGames(GameStyleEntity entity) {
		
		LinkedList<Game> games = new LinkedList<Game>();

		String[] order = entity.getGameOrder().split(";");
		for (int i = 0; i < order.length; i++) {
			String[] pair = order[i].split("-");
			if(pair.length != 2) {
				throw new IllegalStateException("The gameOrder of gameStyle with id='" + entity.getId() + "' has the wrong fromat.");
			}
			
			GameBuilder gameBuilder = Game.builder();
			gameBuilder.gameNumber(i);
			if(pair[0].contains("D") && pair[1].contains("D")) {				
				int homePlayerNumber = Integer.parseInt(pair[HOME_IDX].replace("D", ""));
				int guestPlayerNumber = Integer.parseInt(pair[GUEST_IDX].replace("D", ""));				
				
				gameBuilder.homePlayerNumber(homePlayerNumber);
				gameBuilder.guestPlayerNumber(guestPlayerNumber);
				gameBuilder.isDouble(true);
			}else {
				int homePlayerNumber = Integer.parseInt(pair[HOME_IDX]);
				int guestPlayerNumber = Integer.parseInt(pair[GUEST_IDX]);				

				gameBuilder.homePlayerNumber(homePlayerNumber);
				gameBuilder.guestPlayerNumber(guestPlayerNumber);
				gameBuilder.isDouble(false);
			}	
			
			games.add(gameBuilder.build());			
		}
		return games;
	}
}
