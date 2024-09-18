package com.ttlive.persistence.dao;

import javax.ejb.Stateless;

import com.ttlive.persistence.entity.RegionEntity;
import com.ttlive.utils.BaseDao;

@Stateless
public class RegionDao extends BaseDao<RegionEntity>{

	public RegionDao() {
		super(RegionEntity.class);
	}

}
