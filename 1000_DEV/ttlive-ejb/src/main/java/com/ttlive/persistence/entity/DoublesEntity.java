package com.ttlive.persistence.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.ttlive.utils.MatchState;

import lombok.Data;
import lombok.ToString;

@Data
@Entity
@Table(name = "doubles")
public class DoublesEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(name = "position")
	private int position;

	@Column(name = "is_home_team")
	private boolean isHomeTeam;
	
	@Column(name = "player_1")
	private String player1;
	
	@Column(name = "player_2")
	private String player2;
	
	@Column(name = "state")
	@Enumerated(EnumType.STRING) 
	private MatchState state;
	
	@ManyToOne
	@JoinColumn(name = "match_id", referencedColumnName = "id")
	@ToString.Exclude
	private MatchEntity match;
	
	public void setMatch(MatchEntity match) {
		setMatch(match, true);
	}
	public void setMatch(MatchEntity match, boolean setBoth) {
		if(this.match != null && setBoth)
			this.match.removeDoubles(this, false);
		
		this.match = match;
		
		if(setBoth)
			match.addDoubles(this, false);
	}
}
