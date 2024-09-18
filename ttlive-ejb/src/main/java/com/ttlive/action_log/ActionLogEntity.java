package com.ttlive.action_log;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

import lombok.Data;

@Data
@Entity
@Table(name = "action_log")
public class ActionLogEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(name = "state")
	@Enumerated(EnumType.STRING)
	private ActionLogState state;
	
	@Column(name = "caption")
	private String caption;
	
	@Column(name = "message")
	private String message;
	
	@CreationTimestamp
	@Column(name = "created_at")
	private LocalDateTime createdAt;
}
