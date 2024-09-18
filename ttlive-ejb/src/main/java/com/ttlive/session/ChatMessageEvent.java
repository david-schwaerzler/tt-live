package com.ttlive.session;

import com.ttlive.bo.ChatMessage;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ChatMessageEvent {
	private long matchId;
	private ChatMessage message;
}
