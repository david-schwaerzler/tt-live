package com.ttlive.persistence.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import lombok.Data;

@Data
@Entity
@Table(name = "live_team")
public class LiveTeamEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(name = "name")
	private String name;
	
	@Column(name = "league")
	private String league;	
	
	@UpdateTimestamp
	@Column(name = "created_at")
	private LocalDateTime createdAt;

	@CreationTimestamp
	@Column(name = "modified_at")
	private LocalDateTime modifiedAt;
}
