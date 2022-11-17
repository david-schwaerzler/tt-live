package com.ttlive.dto;

import java.time.LocalDateTime;
import java.util.LinkedList;
import java.util.List;

import com.ttlive.bo.ChatMessage;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ChatMessageDto {
	private long id;	
	private String text;	
	private String username;
	private LocalDateTime createdAt;
	
	public static class ChatMessageDtoBuilder {
		public ChatMessageDtoBuilder bo(ChatMessage bo) {
			this.id = bo.getId();
			this.text = bo.getText();
			this.username = bo.getUsername();
			this.createdAt = bo.getCreatedAt();
			return this;
		}
	}
	
	public static LinkedList<ChatMessageDto> fromBos(List<ChatMessage> bos){
		LinkedList<ChatMessageDto> dtos = new LinkedList<>();
		for(ChatMessage bo : bos) {
			dtos.add(ChatMessageDto.builder().bo(bo).build());
		}
		return dtos;		
	}
}
