package com.ttlive.persistence.entity;

import java.time.LocalDateTime;
import java.util.LinkedList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import lombok.Data;
import lombok.ToString;

@Data
@Entity
@Table(name = "account")
@NamedQuery(name = "Account.findByName", query = "select a from AccountEntity a where a.username = :name")
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

	@Column(name = "role")
	private String role;

	@Column(name = "isAuthenticated")
	private boolean isAuthenticated;

	@UpdateTimestamp
	@Column(name = "created_at")
	private LocalDateTime createdAt;

	@CreationTimestamp
	@Column(name = "modified_at")
	private LocalDateTime modifiedAt;

	@ToString.Exclude
	@OneToMany(mappedBy = "account")
	private List<MatchEntity> matches = new LinkedList<MatchEntity>();

	public void addMatch(MatchEntity match) {
		addMatch(match, true);
	}

	public void addMatch(MatchEntity match, boolean setBoth) {
		if (this.matches.contains(match) == false)
			this.matches.add(match);

		if (setBoth) {
			match.setAccount(this, false);
		}
	}

	public void removeMatch(MatchEntity match) {
		removeMatch(match, true);
	}

	public void removeMatch(MatchEntity match, boolean setBoth) {
		this.matches.remove(match);
		if (setBoth)
			match.setAccount(null, false);

	}
}
