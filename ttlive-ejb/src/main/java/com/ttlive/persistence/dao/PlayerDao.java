package com.ttlive.persistence.dao;

import javax.ejb.Stateless;

import com.ttlive.persistence.entity.PlayerEntity;
import com.ttlive.utils.BaseDao;

@Stateless
public class PlayerDao extends BaseDao<PlayerEntity>{
	public PlayerDao() {
		super(PlayerEntity.class);
	}

}
