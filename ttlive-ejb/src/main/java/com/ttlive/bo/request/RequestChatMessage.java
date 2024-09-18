package com.ttlive.bo.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RequestChatMessage {
	private String username;
	private boolean isEditor;
	private String text;
}
