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

@Entity
@Table(name = "match")
@Data
public class MatchEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
		
	@Column(name = "home_team_score")
	private Integer homeTeamScore;
	
	@Column(name = "guest_team_score")
	private Integer guestTeamScore;
	
	@Column(name = "finished")
	private boolean finished;
	
	@Column(name = "date")
	private LocalDateTime date;
	
	@UpdateTimestamp
	@Column(name = "created_at")
	private LocalDateTime createdAt;

	@CreationTimestamp
	@Column(name = "modified_at")
	private LocalDateTime modifiedAt;
	
	@JoinColumn(name = "home_team_id", referencedColumnName = "id")
	@ManyToOne
	private TeamEntity homeTeam;
	
	@JoinColumn(name = "guest_team_id", referencedColumnName = "id")
	@ManyToOne
	private TeamEntity guestTeam;	
}
