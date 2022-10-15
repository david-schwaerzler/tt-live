package com.ttlive.persistence.entity;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "game_style")
public class GameStyleEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(name = "name")
	private String name;
	
	@Column(name = "description")
	private String description;	
	
	@Column(name = "game_order")
	private String gameOrder;
	
	@Column(name = "num_players")
	private int numPlayers;
	
	@Column(name = "num_doubles")
	private int numDoubles;
	
	@OneToMany(mappedBy = "gameStyle")
	private List<MatchEntity> matches;
}
