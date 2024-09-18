package com.ttlive.persistence.dao;

import javax.ejb.Stateless;

import com.ttlive.persistence.entity.GameEntity;
import com.ttlive.utils.BaseDao;

@Stateless
public class GameDao extends BaseDao<GameEntity>{
	public GameDao() {
		super(GameEntity.class);
	}
}
