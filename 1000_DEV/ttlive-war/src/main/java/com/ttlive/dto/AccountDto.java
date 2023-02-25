package com.ttlive.dto;

import java.time.LocalDateTime;

import com.ttlive.bo.Account;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AccountDto {
	private long id;
	private String username;
	private String email;
	private String role;
	private boolean isAuthenticated;
	private LocalDateTime createdAt;
	private LocalDateTime modifiedAt;
	
	public static class AccountDtoBuilder {		
		public AccountDtoBuilder bo(Account bo) {
			this.id = bo.getId();
			this.username = bo.getUsername();
			this.email = bo.getEmail();
			this.role = bo.getRole();
			this.isAuthenticated = bo.isAuthenticated();
			this.createdAt = bo.getCreatedAt();
			this.modifiedAt = bo.getModifiedAt();
			return this;
		}
	}
}