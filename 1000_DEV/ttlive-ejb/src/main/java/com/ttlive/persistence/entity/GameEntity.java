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
import lombok.ToString;

@Data
@Entity
@Table(name = "game")
public class GameEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(name = "game_number")
	private int gameNumber;

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
	@ToString.Exclude
	private MatchEntity match;

	@ManyToOne
	@JoinColumn(name = "home_player_id")
	private PlayerEntity homePlayer;

	@ManyToOne
	@JoinColumn(name = "guest_player_id")
	private PlayerEntity guestPlayer;

	@ManyToOne
	@JoinColumn(name = "home_doubles_id")
	private DoublesEntity homeDoubles;

	@ManyToOne
	@JoinColumn(name = "guest_doubles_id")
	private DoublesEntity guestDoubles;

	public void setMatch(MatchEntity match) {
		setMatch(match, true);
	}

	public void setMatch(MatchEntity match, boolean setBoth) {
		if (this.match != null && setBoth)
			this.match.removeGame(this);
		this.match = match;
		if (setBoth)
			match.addGame(this);
	}
	/*
	 * public void setHomePlayer(PlayerEntity player) { setHomePlayer(player, true)
	 * }
	 * 
	 * public void setHomePlayer(PlayerEntity player, boolean setBoth) { if
	 * (this.homePlayer != null && setBoth) this.homePlayer.removeGame(this, false);
	 * this.homePlayer = player; if (setBoth) homePlayer.addGame(this, false); }
	 */

}
