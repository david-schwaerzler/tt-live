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
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.ttlive.utils.LeagueContest;

import lombok.Data;

@Data
@Entity
@Table(name = "league")
public class LeagueEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(name = "name")
	private String name;

	@Column(name = "contest")
	@Enumerated(EnumType.STRING)
	private LeagueContest contest;

	@CreationTimestamp
	@Column(name = "created_at")
	private LocalDateTime createdAt;

	@UpdateTimestamp
	@Column(name = "modified_at")
	private LocalDateTime modifiedAt;

	@ManyToOne
	@JoinColumn(name = "region_id", referencedColumnName = "id")
	private RegionEntity region;

	@OneToMany(mappedBy = "league")
	private List<TeamEntity> teams = new LinkedList<TeamEntity>();

	@OneToMany(mappedBy = "league")
	private List<MatchEntity> matches = new LinkedList<MatchEntity>();

	public void setRegion(RegionEntity region) {
		setRegion(region, true);
	}

	public void setRegion(RegionEntity region, boolean setBoth) {
		if (this.region != null && setBoth)
			this.region.removeLeague(this, false);
		this.region = region;
		if (setBoth)
			region.addLeague(this, false);
	}

	public void addTeam(TeamEntity team) {
		addTeam(team, true);
	}

	public void addTeam(TeamEntity team, boolean setBoth) {
		if (!teams.contains(team))
			teams.add(team);
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

	public void addMatch(MatchEntity match) {
		addMatch(match, true);
	}

	public void addMatch(MatchEntity match, boolean setBoth) {
		if (!matches.contains(match))
			matches.add(match);
		if (setBoth)
			match.setLeague(this, false);
	}

	public void removeMatch(MatchEntity match) {
		removeMatch(match, true);
	}

	public void removeMatch(MatchEntity match, boolean setBoth) {
		matches.remove(match);
		if (setBoth)
			match.setLeague(null, false);
	}
}
