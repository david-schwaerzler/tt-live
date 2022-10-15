package com.ttlive.persistence.dao;

import javax.ejb.Stateless;

import com.ttlive.persistence.entity.GameStyleEntity;
import com.ttlive.utils.BaseDao;

@Stateless
public class GameStyleDao extends BaseDao<GameStyleEntity>{

	public GameStyleDao() {
		super(GameStyleEntity.class);
	}

}
