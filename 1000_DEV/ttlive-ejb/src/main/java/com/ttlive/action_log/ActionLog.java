package com.ttlive.action_log;

import java.time.LocalDateTime;
import java.util.LinkedList;
import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ActionLog {
	private long id;
	private ActionLogState state;
	private String caption;
	private String message;
	private LocalDateTime createdAt;
	
	public static class ActionLogBuilder {
		public ActionLogBuilder entity(ActionLogEntity entity) {
			this.id = entity.getId();
			this.state = entity.getState();
			this.caption = entity.getCaption();
			this.message = entity.getMessage();
			this.createdAt = entity.getCreatedAt();
			return this;
		}
	}
	
	public static LinkedList<ActionLog> fromEntities(List<ActionLogEntity> entities){
		LinkedList<ActionLog> ret = new LinkedList<ActionLog>();
		for(ActionLogEntity entity : entities) {
			ret.add(ActionLog.builder().entity(entity).build());
		}
		return ret;
	}
}
