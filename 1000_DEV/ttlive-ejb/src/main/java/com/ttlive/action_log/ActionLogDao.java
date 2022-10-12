package com.ttlive.action_log;

import javax.ejb.Stateless;

import com.ttlive.utils.BaseDao;

@Stateless
public class ActionLogDao extends BaseDao<ActionLogEntity>{

	public ActionLogDao() {
		super(ActionLogEntity.class);
	}
}