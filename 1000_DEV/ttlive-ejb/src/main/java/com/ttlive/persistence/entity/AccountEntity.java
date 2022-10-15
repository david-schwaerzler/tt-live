package com.ttlive.persistence.entity;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import lombok.Data;

@Data
@Entity
@Table(name = "account")
public class AccountEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(name = "username")
	private String username;
	
	@Column(name = "password")
	private String password;
	
	@Column(name = "email")
	private String email;
	
	@Column(name = "isAuthenticated")
	private boolean isAuthenticated;
	
	@UpdateTimestamp
	@Column(name = "created_at")
	private LocalDateTime createdAt;

	@CreationTimestamp
	@Column(name = "modified_at")
	private LocalDateTime modifiedAt;
	
	@OneToMany(mappedBy = "account")
	private List<MatchEntity> matches;
}
