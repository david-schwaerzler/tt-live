package com.ttlive.dto;

import com.ttlive.service.AccountService.LoginStatus;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginResponseDto {
	private LoginStatus status;
	private AccountDto account;
	private String token;	
	private long tokenValidity;
	private String refreshToken;
	private long refreshTokenValidity;
}
