package com.ttlive.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RequestChatMessageDto {
	private String text;
	private String username;
	private boolean isEditor;
}
