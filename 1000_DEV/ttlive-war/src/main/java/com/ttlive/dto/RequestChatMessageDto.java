package com.ttlive.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RequestChatMessageDto {
	private String text;
	private String username;
	private boolean isEditor;
}
