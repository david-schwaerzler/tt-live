package com.ttlive.action_log;

import java.util.LinkedList;
import java.util.List;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;

import lombok.extern.java.Log;

@Stateless
@Log
public class ActionLogService {

	@EJB
	private ActionLogDao dao;
	
	@TransactionAttribute(TransactionAttributeType.REQUIRES_NEW)
	public void log(ActionLogState state, String caption, String message) {
		ActionLogEntity entity = new ActionLogEntity();
		entity.setCaption(caption);
		entity.setState(state);
		entity.setMessage(message);
		dao.persist(entity);
		log.info(state + " " + caption + " " + message);
	}
	
	@TransactionAttribute(TransactionAttributeType.REQUIRES_NEW)
	public void logStart(String caption, String message) {
		log(ActionLogState.START, caption, message);
	}
	
	@TransactionAttribute(TransactionAttributeType.REQUIRES_NEW)
	public void logFinished(String caption, String message) {
		log(ActionLogState.FINISHED, caption, message);
	}
	
	@TransactionAttribute(TransactionAttributeType.REQUIRES_NEW)
	public void logWarning(String caption, String message) {
		log(ActionLogState.WARNING, caption, message);
	}
	
	@TransactionAttribute(TransactionAttributeType.REQUIRES_NEW)
	public void logAbort(String caption, String message) {
		log(ActionLogState.ABORT, caption, message);
	}
	
	@TransactionAttribute(TransactionAttributeType.REQUIRES_NEW)
	public void logError(String caption, String message) {
		log(ActionLogState.ERROR, caption, message);
	}
	
	@TransactionAttribute(TransactionAttributeType.REQUIRES_NEW)
	public void logInfo(String caption, String message) {
		log(ActionLogState.INFO, caption, message);
	}
	
	public LinkedList<ActionLog> findAll(){
		List<ActionLogEntity> entities = dao.findAll();
		return ActionLog.fromEntities(entities);		
	}
	
	public ActionLog findById(long id) {
		ActionLogEntity entity = dao.findById(id);
		return ActionLog.builder().entity(entity).build();
	}
}
