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
@Table(name = "game")
public class GameEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(name = "game_number")
	private int gameNumber;
	
	@Column(name = "home_player_number")
	private int homePlayerNumber;

	@Column(name = "guest_player_number")
	private int guestPlayerNumber;

	@Column(name = "home_player")
	private String homePlayer;

	@Column(name = "guest_player")
	private String guestPlayer;

	@Column(name = "is_double")
	private boolean isDouble;

	@Column(name = "set1")
	private String set1;
	
	@Column(name = "set2")
	private String set2;
	
	@Column(name = "set3")
	private String set3;
	
	@Column(name = "set4")
	private String set4;
	
	@Column(name = "set5")
	private String set5;
	
	@CreationTimestamp
	@Column(name = "created_at")
	private LocalDateTime createdAt;
	
	@UpdateTimestamp
	@Column(name = "modified_at")
	private LocalDateTime modifiedAt;
	
	@ManyToOne
	@JoinColumn(name = "match_id", referencedColumnName = "id")
	private MatchEntity match;
	
	
}
