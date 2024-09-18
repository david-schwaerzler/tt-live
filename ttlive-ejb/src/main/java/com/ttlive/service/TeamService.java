package com.ttlive.service;

import java.util.LinkedList;
import java.util.List;

import javax.ejb.EJB;
import javax.ejb.Stateless;

import com.ttlive.bo.Team;
import com.ttlive.bo.request.RequestTeam;
import com.ttlive.persistence.dao.TeamDao;
import com.ttlive.persistence.entity.LeagueEntity;
import com.ttlive.persistence.entity.TeamEntity;

@Stateless
public class TeamService {

	@EJB
	private TeamDao teamDao;

	public LinkedList<Team> findAll() {
		List<TeamEntity> teams = teamDao.findAll();
		return getDefault(teams);
	}

	/**
	 * Updates the teamEntity. There are 3 behaviours:
	 * 	- If values of the TeamEntity won't change, the entiy ist simply returned
	 *  - If a teamEntity with the given updated values exists, this team ist returned instead
	 *  - If no team with the new values exists, a new team is created.
	 * 
	 * @param teamEntity to update
	 * @param club new club
	 * @param number mew number
	 * @return the team with the updated values
	 */
	public TeamEntity updateTeam(TeamEntity teamEntity, RequestTeam requestTeam, LeagueEntity newLeague) {

		if (teamEntity.getClub().equals(requestTeam.getClub()) && teamEntity.getNumber() == requestTeam.getNumber()
				&& teamEntity.getLeague().getId() == newLeague.getId())
			return teamEntity;

		TeamEntity existingTeam = teamDao.findBy(requestTeam.getClub(), requestTeam.getNumber(), newLeague.getId());

		if (existingTeam != null)
			return existingTeam;

		TeamEntity newTeam = new TeamEntity();
		newTeam.setClub(requestTeam.getClub());
		newTeam.setNumber(requestTeam.getNumber());
		newTeam.setLeague(newLeague);

		teamDao.persist(newTeam);
		return newTeam;
	}

	public LinkedList<Team> getDefault(List<TeamEntity> entities) {
		LinkedList<Team> teams = new LinkedList<Team>();
		entities.forEach(e -> teams.add(Team.builder().entity(e).build()));
		return teams;
	}

}
