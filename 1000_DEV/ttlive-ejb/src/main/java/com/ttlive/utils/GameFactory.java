package com.ttlive.utils;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;

import com.ttlive.persistence.entity.DoublesEntity;
import com.ttlive.persistence.entity.GameEntity;
import com.ttlive.persistence.entity.GameStyleEntity;
import com.ttlive.persistence.entity.PlayerEntity;

public class GameFactory {
	private static final int HOME_IDX = 0;
	private static final int GUEST_IDX = 1;

	public static LinkedList<GameEntity> createGames(GameStyleEntity gameStyleEntity, List<PlayerEntity> homePlayers,
			List<PlayerEntity> guestPlayers, List<DoublesEntity> homeDoubles, List<DoublesEntity> guestDoubles) {

		HashMap<Integer, PlayerEntity> homePlayerMap = createPlayerMap(homePlayers);
		HashMap<Integer, PlayerEntity> guestPlayerMap = createPlayerMap(guestPlayers);
		HashMap<Integer, DoublesEntity> homeDoublesMap = createDoublesMap(homeDoubles);
		HashMap<Integer, DoublesEntity> guestDoublesMap = createDoublesMap(guestDoubles);

		LinkedList<GameEntity> games = new LinkedList<GameEntity>();

		String[] order = gameStyleEntity.getGameOrder().split(";");
		for (int i = 0; i < order.length; i++) {
			String[] pair = order[i].split("-");
			if (pair.length != 2) {
				throw new IllegalStateException(
						"The gameOrder of gameStyle with id='" + gameStyleEntity.getId() + "' has the wrong fromat.");
			}

			GameEntity entity = new GameEntity();
			entity.setState(MatchState.NOT_STARTED);
			entity.setGameNumber(i + 1);
			if (pair[0].contains("D") && pair[1].contains("D")) {
				int homePlayerNumber = Integer.parseInt(pair[HOME_IDX].replace("D", ""));
				int guestPlayerNumber = Integer.parseInt(pair[GUEST_IDX].replace("D", ""));

				entity.setHomeDoubles(homeDoublesMap.get(homePlayerNumber));
				entity.setGuestDoubles(guestDoublesMap.get(guestPlayerNumber));
				entity.setDoubles(true);
			} else {
				int homePlayerNumber = Integer.parseInt(pair[HOME_IDX]);
				int guestPlayerNumber = Integer.parseInt(pair[GUEST_IDX]);

				entity.setHomePlayer(homePlayerMap.get(homePlayerNumber));
				entity.setGuestPlayer(guestPlayerMap.get(guestPlayerNumber));
				entity.setDoubles(false);
			}

			games.add(entity);
		}
		return games;
	}

	private static HashMap<Integer, PlayerEntity> createPlayerMap(List<PlayerEntity> players) {
		HashMap<Integer, PlayerEntity> map = new HashMap<Integer, PlayerEntity>();
		players.forEach(p -> map.put(p.getPosition(), p));
		return map;
	}
	
	private static HashMap<Integer, DoublesEntity> createDoublesMap(List<DoublesEntity> doubles) {
		HashMap<Integer, DoublesEntity> map = new HashMap<Integer, DoublesEntity>();
		doubles.forEach(p -> map.put(p.getPosition(), p));
		return map;
	}
}
