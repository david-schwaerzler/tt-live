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
@Table(name = "region")
public class RegionEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(name = "name")
	private String name;

	@Column(name = "description")
	private String description;

	@OneToMany(mappedBy = "region")
	private List<LeagueEntity> leagues;

	public void addLeague(LeagueEntity league) {
		addLeague(league, true);
	}

	public void addLeague(LeagueEntity league, boolean setBoth) {
		if(!leagues.contains(league))
			leagues.add(league);
		
		if(setBoth) {
			league.setRegion(this, false);
		}
	}
	
	public void removeLeague(LeagueEntity league) {
		removeLeague(league, true);
	}

	public void removeLeague(LeagueEntity league, boolean setBoth) {
		leagues.remove(league);
		
		if(setBoth) {
			league.setRegion(null, false);
		}
	}

}
