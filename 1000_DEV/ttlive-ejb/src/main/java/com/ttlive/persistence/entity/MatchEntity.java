package com.ttlive.persistence.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import lombok.Data;

@Data
@Entity
@Table(name = "match")
public class MatchEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(name = "title")
	private String title;
	
	@Column(name = "description")
	private String description;
	
	@Column(name = "home_team_score")
	private int homeTeamScore;
	
	@Column(name = "guest_team_score")
	private int guestTeamScore;
	
	@Column(name = "home_players")
	private String homePlayers;
	
	@Column(name = "guest_players")
	private String guestPlayers;
	
	@ManyToOne
	@JoinColumn(name = "league_id", referencedColumnName = "id")
	private LeagueEntity league;
	
	@ManyToOne
	@JoinColumn(name = "home_team_id", referencedColumnName = "id")
	private TeamEntity homeTeam;
	
	@ManyToOne
	@JoinColumn(name = "guest_team_id", referencedColumnName = "id")
	private TeamEntity guestTeam;
	
	@ManyToOne
	@JoinColumn(name = "account_id", referencedColumnName = "id")
	private AccountEntity account;
	
	@ManyToOne
	@JoinColumn(name = "game_style_id", referencedColumnName = "id")
	private GameStyleEntity gameStyle;
	
	@CreationTimestamp
	@Column(name = "created_at")
	private LocalDateTime createdAt;
	
	@UpdateTimestamp
	@Column(name = "modified_at")
	private LocalDateTime modifiedAt;
}
