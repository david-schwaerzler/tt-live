package com.ttlive.persistence.entity;

import java.time.LocalDateTime;
import java.util.LinkedList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import lombok.Data;

@Data
@Entity
@Table(name = "team")
@NamedQuery(name = "Team.findByName", query = "select t from TeamEntity t join t.league l where t.fullName = :name and l.contest = :contest")
public class TeamEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(name = "full_name")
	private String fullName;

	@Column(name = "number")
	private int number;

	@Column(name = "club")
	private String club;

	@Column(name = "victories")
	private int victories;

	@Column(name = "losses")
	private int losses;

	@Column(name = "ties")
	private int ties;

	@Column(name = "retreated")
	private boolean retreated;
	
	@Column(name = "link")
	private String link;

	@Column(name = "is_clicktt")
	private boolean isClicktt;

	@Column(name = "last_fetched")
	private LocalDateTime lastFetched;

	@UpdateTimestamp
	@Column(name = "created_at")
	private LocalDateTime createdAt;

	@CreationTimestamp
	@Column(name = "modified_at")
	private LocalDateTime modifiedAt;

	@ManyToOne
	@JoinColumn(name = "league_id")
	private LeagueEntity league;

	@OneToMany(mappedBy = "guestTeam")
	private List<MatchEntity> homeMatches = new LinkedList<MatchEntity>();
	
	@OneToMany(mappedBy = "homeTeam")
	private List<MatchEntity> guest_team = new LinkedList<MatchEntity>();

	public void setLeague(LeagueEntity league) {
		setLeague(league, true);
	}

	public void setLeague(LeagueEntity league, boolean setBoth) {
		if (this.league != null && setBoth) {
			this.league.removeTeam(this, false);
		}

		this.league = league;
		if (setBoth)
			league.addTeam(this, false);
	}
}
