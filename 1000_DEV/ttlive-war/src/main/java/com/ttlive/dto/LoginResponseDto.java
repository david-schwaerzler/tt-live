package com.ttlive.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginResponseDto {
	private String status;
	private String token;	
}
