package com.ttlive.service;

import java.util.LinkedList;
import java.util.List;

import javax.ejb.EJB;
import javax.ejb.Stateless;

import com.ttlive.bo.GameStyle;
import com.ttlive.persistence.dao.GameStyleDao;
import com.ttlive.persistence.entity.GameStyleEntity;

@Stateless
public class GameStyleService {

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

}
