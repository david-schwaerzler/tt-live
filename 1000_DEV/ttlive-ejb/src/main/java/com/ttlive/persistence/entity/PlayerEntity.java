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
@Table(name = "player")
public class PlayerEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(name = "name")
	private String name;
	
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
	@JoinColumn(name = "team_id")
	private TeamEntity team;	
	
}
