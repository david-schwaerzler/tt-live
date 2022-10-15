package com.ttlive.persistence.entity;

import java.time.LocalDateTime;
import java.util.List;

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

	@ManyToOne
	@JoinColumn(name = "league_id", referencedColumnName = "id")
	private LeagueEntity league;
	
	@OneToMany(mappedBy = "team")
	private List<PlayerEntity> players;
	
	@OneToMany(mappedBy = "homeTeam")
	private List<MatchEntity> homeMatched;
	
	@OneToMany(mappedBy = "guestTeam")
	private List<MatchEntity> guestMatched;
	

	@CreationTimestamp
	@Column(name = "created_at")
	private LocalDateTime createdAt;

	@UpdateTimestamp
	@Column(name = "modified_at")
	private LocalDateTime modifiedAt;
}
