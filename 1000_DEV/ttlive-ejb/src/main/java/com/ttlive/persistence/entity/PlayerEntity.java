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
@Table(name = "player")
public class PlayerEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(name = "name")
	private String name;	

	@Column(name = "position")
	private int position;
	
	@Column(name = "is_home_team")
	private boolean isHomeTeam;
	
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
	
	public void setMatch(MatchEntity match) {
		setMatch(match, true);
	}
	public void setMatch(MatchEntity match, boolean setBoth) {
		if(this.match != null && setBoth) 
			this.match.removePlayer(this, false);
		this.match = match;
		
		if(setBoth && match != null)
			match.addPlayer(this);
	}
}
