package com.ttlive.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EditorCodeDto {
	private long matchId;
	private String editorCode;
}
