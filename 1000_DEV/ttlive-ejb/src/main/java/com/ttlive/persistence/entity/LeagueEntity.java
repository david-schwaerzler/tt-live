package com.ttlive.persistence.entity;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.ttlive.utils.LeagueContest;

import lombok.Data;

@Data
@Entity
@Table(name = "league")
public class LeagueEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "contest")
	@Enumerated(EnumType.STRING)
	private LeagueContest contest;
	
	@ManyToOne
	@JoinColumn(name = "region_id", referencedColumnName = "id")
	private RegionEntity region;
	
	@OneToMany(mappedBy = "league")
	private List<TeamEntity> teams;
	
	@CreationTimestamp
	@Column(name = "created_at")
	private LocalDateTime createdAt;
	
	@UpdateTimestamp
	@Column(name = "modified_at")
	private LocalDateTime modifiedAt;
	
	@OneToMany(mappedBy = "league")
	private List<MatchEntity> matched;

}
