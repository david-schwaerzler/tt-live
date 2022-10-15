package com.ttlive.bo;

import java.time.LocalDateTime;
import java.util.LinkedList;
import java.util.List;

import com.ttlive.persistence.entity.AccountEntity;
import com.ttlive.persistence.entity.MatchEntity;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Account {
	private long id;
	private String username;
	private String password;
	private String email;
	private boolean isAuthenticated;
	private LocalDateTime createdAt;
	private LocalDateTime modifiedAt;
	private LinkedList<Match> matches;
	
	public static class AccountBuilder {
		public AccountBuilder entity(AccountEntity entity) {
			this.id = entity.getId();
			this.username = entity.getUsername();
			this.password = entity.getPassword();
			this.email = entity.getEmail();
			this.isAuthenticated = entity.isAuthenticated();
			this.createdAt = entity.getCreatedAt();
			this.modifiedAt = entity.getModifiedAt();
			return this;
		}
		public AccountBuilder matchEntities(List<MatchEntity> entities) {
			this.matches = new LinkedList<Match>();
			entities.forEach(m -> matches.add(Match.builder().entity(m).build()));
			return this;
		}
	}
}
