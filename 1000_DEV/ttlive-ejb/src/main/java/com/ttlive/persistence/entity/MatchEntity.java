package com.ttlive.persistence.entity;

import java.time.LocalDateTime;
import java.util.LinkedList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.ttlive.utils.MatchState;

import lombok.Data;
import lombok.ToString;

@Data
@Entity
@Table(name = "match")
@NamedQuery(name = "Match.findCodes", query = "select m.code, m.editorCode from MatchEntity m")
public class MatchEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(name = "title")
	private String title;

	@Column(name = "description")
	private String description;

	@Column(name = "home_team_score")
	private int homeTeamScore;

	@Column(name = "guest_team_score")
	private int guestTeamScore;

	@Column(name = "code")
	private String code;

	@Column(name = "editorCode")
	private String editorCode;
	
	@Column(name = "state")
	@Enumerated(EnumType.STRING)
	private MatchState state;
	
	@Column(name="start_date")
	private LocalDateTime startDate;

	@ManyToOne(cascade = { CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH })
	@JoinColumn(name = "league_id", referencedColumnName = "id")
	private LeagueEntity league;

	@ManyToOne(cascade = { CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH })
	@JoinColumn(name = "home_team_id", referencedColumnName = "id")
	private TeamEntity homeTeam;

	@ManyToOne(cascade = { CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH })
	@JoinColumn(name = "guest_team_id", referencedColumnName = "id")
	private TeamEntity guestTeam;

	@ManyToOne(cascade = { CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH })
	@JoinColumn(name = "account_id", referencedColumnName = "id")
	private AccountEntity account;

	@ManyToOne(cascade = { CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH })
	@JoinColumn(name = "game_style_id", referencedColumnName = "id")
	private GameStyleEntity gameStyle;

	@ToString.Exclude
	@OneToMany(mappedBy = "match", cascade = { CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH,
			CascadeType.REMOVE })
	private List<GameEntity> games = new LinkedList<GameEntity>();

	@ToString.Exclude
	@OneToMany(mappedBy = "match", cascade = { CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH,
			CascadeType.REMOVE })
	private List<PlayerEntity> players = new LinkedList<PlayerEntity>();

	@ToString.Exclude
	@OneToMany(mappedBy = "match", cascade = { CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH,
			CascadeType.REMOVE })
	private List<DoublesEntity> doubles = new LinkedList<DoublesEntity>();

	@CreationTimestamp
	@Column(name = "created_at")
	private LocalDateTime createdAt;

	@UpdateTimestamp
	@Column(name = "modified_at")
	private LocalDateTime modifiedAt;

	public void setLeague(LeagueEntity league) {
		setLeague(league, true);
	}

	public void setLeague(LeagueEntity league, boolean setBoth) {
		if (this.league != null && setBoth) {
			this.league.removeMatch(this, false);
		}
		this.league = league;
		
		if (setBoth && league != null)
			this.league.addMatch(this, false);
	}

	public void setHomeTeam(TeamEntity team) {
		setHomeTeam(team, true);
	}

	public void setHomeTeam(TeamEntity team, boolean setBoth) {
		if (this.homeTeam != null && setBoth)
			this.homeTeam.removeHomeMatch(this, false);
		this.homeTeam = team;
		
		if (setBoth && team != null)
			team.addHomeMatch(this, false);
	}

	public void setGuestTeam(TeamEntity team) {
		setGuestTeam(team, true);
	}

	public void setGuestTeam(TeamEntity team, boolean setBoth) {
		if (this.guestTeam != null && setBoth)
			this.guestTeam.removeGuestMatch(this, false);
		this.guestTeam = team;
		
		if (setBoth && team != null)
			team.addGuestMatch(this, false);
	}

	public void setGameStyle(GameStyleEntity gameStyle) {
		setGameStyle(gameStyle, true);
	}

	public void setGameStyle(GameStyleEntity gameStyle, boolean setBoth) {
		if (this.gameStyle != null && setBoth)
			this.gameStyle.removeMatch(this, false);
		this.gameStyle = gameStyle;
		
		if (setBoth && gameStyle != null)
			gameStyle.addMatch(this, false);
	}

	public void addGame(GameEntity game) {
		addGame(game, true);
	}

	public void addGame(GameEntity game, boolean setBoth) {
		if (!games.contains(game))
			games.add(game);
		if (setBoth)
			game.setMatch(this, false);
	}

	public void removeGame(GameEntity game) {
		removeGame(game, true);
	}

	public void removeGame(GameEntity game, boolean setBoth) {
		games.remove(game);
		if (setBoth)
			game.setMatch(null, false);
	}

	public void addPlayer(PlayerEntity player) {
		addPlayer(player, true);
	}

	public void addPlayer(PlayerEntity player, boolean setBoth) {
		if (!players.contains(player))
			players.add(player);
		if (setBoth)
			player.setMatch(this, false);
	}

	public void removePlayer(PlayerEntity player) {
		removePlayer(player, true);
	}

	public void removePlayer(PlayerEntity player, boolean setBoth) {
		players.remove(player);
		if (setBoth)
			player.setMatch(null, false);
	}

	public void addDoubles(DoublesEntity doubles) {
		addDoubles(doubles, true);
	}

	public void addDoubles(DoublesEntity doubles, boolean setBoth) {
		if (!this.doubles.contains(doubles))
			this.doubles.add(doubles);

		if (setBoth)
			doubles.setMatch(this, false);
	}

	public void removeDoubles(DoublesEntity doubles) {
		removeDoubles(doubles, true);
	}

	public void removeDoubles(DoublesEntity doubles, boolean setBoth) {
		this.doubles.remove(doubles);

		if (setBoth)
			doubles.setMatch(null, false);
	}
}
