package com.ttlive.persistence.entity;

import java.time.LocalDateTime;
import java.util.LinkedList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
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
@NamedQueries({
		@NamedQuery(name = "Account.findByName", query = "select a from AccountEntity a where a.username = :name"),
		@NamedQuery(name = "Account.findMatches", query = "select m from AccountEntity a join a.matches m where a.id = :id") })
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

	@ToString.Exclude
	@OneToMany(mappedBy = "account", cascade = { CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH,
			CascadeType.REMOVE }, orphanRemoval = true)
	private List<AccountFilterSetEntity> filterSets = new LinkedList<AccountFilterSetEntity>();

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

	public void addFilterSet(AccountFilterSetEntity filter) {
		addFilterSet(filter, true);
	}

	public void addFilterSet(AccountFilterSetEntity filterSet, boolean setBoth) {
		if (!filterSets.contains(filterSet))
			filterSets.add(filterSet);
		if (setBoth)
			filterSet.setAccount(this, false);
	}

	public void removeFilterSet(AccountFilterSetEntity filterSet) {
		removeFilterSet(filterSet, true);
	}

	public void removeFilterSet(AccountFilterSetEntity filterSet, boolean setBoth) {
		filterSets.remove(filterSet);
		if (setBoth)
			filterSet.setAccount(null, false);
	}
}
