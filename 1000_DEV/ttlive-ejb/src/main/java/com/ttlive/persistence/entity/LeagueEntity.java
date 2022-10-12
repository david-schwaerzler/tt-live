package com.ttlive.persistence.entity;

import java.time.LocalDateTime;
import java.util.LinkedList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.NamedQuery;
import org.hibernate.annotations.UpdateTimestamp;

import com.ttlive.utils.LeagueContest;

import lombok.Data;

@Entity
@Table(name = "league")
@Data
@NamedQuery(name = "League.loadByContest", query = "select l from LeagueEntity l where l.contest = :contest")
public class LeagueEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(name = "name")
	private String name;

	@Column(name = "region")
	private String region;

	@Column(name = "link")
	private String link;

	@Column(name = "contest")
	@Enumerated(EnumType.STRING)
	private LeagueContest contest;

	@UpdateTimestamp
	@Column(name = "created_at")
	private LocalDateTime createdAt;

	@CreationTimestamp
	@Column(name = "modified_at")
	private LocalDateTime modifiedAt;

	@OneToMany(mappedBy = "league")
	private List<TeamEntity> teams = new LinkedList<TeamEntity>();

	public void addTeam(TeamEntity team) {
		addTeam(team, true);
	}

	public void addTeam(TeamEntity team, boolean setBoth) {
		if (!teams.contains(team)) {
			teams.add(team);
		}
		if (setBoth)
			team.setLeague(this, false);
	}

	public void removeTeam(TeamEntity team) {
		removeTeam(team, true);
	}

	public void removeTeam(TeamEntity team, boolean setBoth) {
		teams.remove(team);
		if (setBoth)
			team.setLeague(null, false);
	}
}
