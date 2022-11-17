package com.ttlive.persistence.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

import lombok.Data;

@NamedQueries({
	@NamedQuery(name = "Chat.findByMatch", query = "select m from ChatMessageEntity m where m.matchId = :id")
})
@Table(name = "chat_message")
@Entity
@Data
public class ChatMessageEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(name = "text")
	private String text;
	
	@Column(name = "username")
	private String username;
	
	@ManyToOne
	@JoinColumn(name="account_id", referencedColumnName = "id")
	private AccountEntity account;
	
	@Column(name = "match_id", insertable = false, updatable = false)
	private long matchId;
	
	@ManyToOne
	@JoinColumn(name="match_id", referencedColumnName = "id")
	private MatchEntity match;	
	
	@CreationTimestamp
	@Column(name = "created_at")
	private LocalDateTime createdAt;
}
