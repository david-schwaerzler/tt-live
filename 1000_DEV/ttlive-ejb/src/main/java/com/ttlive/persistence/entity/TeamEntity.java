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
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import lombok.Data;

@Data
@Entity
@Table(name = "team")
public class TeamEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(name = "club")
	private String club;

	@Column(name = "number")
	private int number;

	@CreationTimestamp
	@Column(name = "created_at")
	private LocalDateTime createdAt;

	@UpdateTimestamp
	@Column(name = "modified_at")
	private LocalDateTime modifiedAt;

	@ManyToOne(cascade = { CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE })
	@JoinColumn(name = "league_id", referencedColumnName = "id")
	private LeagueEntity league;

	@OneToMany(mappedBy = "homeTeam")
	private List<MatchEntity> homeMatches = new LinkedList<MatchEntity>();

	@OneToMany(mappedBy = "guestTeam")
	private List<MatchEntity> guestMatches = new LinkedList<MatchEntity>();

	public void setLeague(LeagueEntity league) {
		setLeague(league, true);
	}

	public void setLeague(LeagueEntity league, boolean setBoth) {
		if (this.league != null && setBoth) {
			this.league.removeTeam(this, false);
		}

		this.league = league;
		league.addTeam(this, false);
	}

	public void addHomeMatch(MatchEntity entity) {
		addHomeMatch(entity, true);
	}

	public void addHomeMatch( MatchEntity entity, boolean setBoth) {
		if(!homeMatches.contains(entity))
			homeMatches.add(entity);		
		if(setBoth)
			entity.setHomeTeam(this, false);		
	}
	
	public void removeHomeMatch(MatchEntity match) {
		removeHomeMatch(match, true);
	}

	public void removeHomeMatch(MatchEntity match, boolean setBoth) {
		homeMatches.remove(match);
		if (setBoth)
			match.setLeague(null, false);
	}
	
	public void addGuestMatch(MatchEntity entity) {
		addGuestMatch(entity, true);
	}

	public void addGuestMatch( MatchEntity entity, boolean setBoth) {
		if(!guestMatches.contains(entity))
			guestMatches.add(entity);
		
		if(setBoth)
			entity.setHomeTeam(this, false);		
	}
	
	public void removeGuestMatch(MatchEntity match) {
		removeGuestMatch(match, true);
	}

	public void removeGuestMatch(MatchEntity match, boolean setBoth) {
		guestMatches.remove(match);
		if (setBoth)
			match.setLeague(null, false);
	}
}
