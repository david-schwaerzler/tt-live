package com.ttlive.bo;

import java.time.LocalDateTime;

import com.ttlive.persistence.entity.ChatMessageEntity;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ChatMessage {
	private long id;	
	private String text;
	private boolean isEditor;
	private String username;
	private LocalDateTime createdAt;
	
	public static class ChatMessageBuilder {
		public ChatMessageBuilder entity(ChatMessageEntity entity) {
			this.id = entity.getId();
			this.text = entity.getText();
			this.isEditor = entity.isEditor();
			this.username = entity.getUsername();
			this.createdAt = entity.getCreatedAt();
			return this;
		}
	}
}
