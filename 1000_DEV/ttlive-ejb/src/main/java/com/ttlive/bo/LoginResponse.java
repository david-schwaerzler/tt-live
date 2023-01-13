package com.ttlive.bo;

import com.ttlive.service.AccountService.LoginStatus;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginResponse {
	private Account account;
	private LoginStatus status;
}
