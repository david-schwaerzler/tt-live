package com.ttlive.service;

import java.util.LinkedList;
import java.util.List;

import javax.ejb.EJB;
import javax.ejb.Stateless;

import com.ttlive.bo.League;
import com.ttlive.bo.Team;
import com.ttlive.bo.request.RequestLeague;
import com.ttlive.exceptions.BadRestRequestException;
import com.ttlive.persistence.dao.LeagueDao;
import com.ttlive.persistence.dao.RegionDao;
import com.ttlive.persistence.entity.LeagueEntity;
import com.ttlive.persistence.entity.RegionEntity;

@Stateless
public class LeagueService {

	@EJB
	private LeagueDao leagueDao;
	
	@EJB
	private RegionDao regionDao;

	public LinkedList<League> findAll() {
		List<LeagueEntity> leagues = leagueDao.findAll();
		return getDefault(leagues);
	}

	public LinkedList<Team> findTeams(long leagueId) {
		LeagueEntity league = leagueDao.findById(leagueId);
		if (league == null)
			throw new NullPointerException("League wiht id='" + leagueId + "' doesn't exist");

		LinkedList<Team> teams = new LinkedList<Team>();
		league.getTeams().forEach(t -> teams.add(Team.builder().entity(t).build()));
		return teams;
	}

	/**
	 * Updates the given LeagueEntity. There are 3 behaviours:
	 * 	- If the values didn't change, the given entity is simply returned
	 *  - If a league already exists with the given new values, return this league
	 *  - If no league with the new values exist it will be created and returned
	 * @param leagueEntity to update
	 * @param requestLeague request object containing the new values 
	 * @return the updated LeagueEntity
	 * @throws BadRestRequestException when the new region doesn't exist
	 */
	public LeagueEntity updateLeague(LeagueEntity leagueEntity, RequestLeague requestLeague) throws BadRestRequestException {		

		// If the league didn't change, simply return it
		if (leagueEntity.getName().equals(requestLeague.getName()) //
				&& leagueEntity.getContest() == requestLeague.getContest() // 
				&& leagueEntity.getRegion().getId() == requestLeague.getRegionId())
			return leagueEntity;

		// Check if a League with the provided values already exists. 
		// If true return this league
		LeagueEntity existingLeague = leagueDao.findBy(requestLeague.getName(), requestLeague.getContest(), requestLeague.getRegionId());
		if (existingLeague != null) {
			return existingLeague;
		}
		
		RegionEntity regionEntity = regionDao.findById(requestLeague.getRegionId());
		if(regionEntity == null)
			throw new BadRestRequestException("regionId", "Region with the given id='" + requestLeague.getRegionId() + "' doesn't exist");

		LeagueEntity newEntity = new LeagueEntity();
		newEntity.setName(requestLeague.getName());
		newEntity.setContest(requestLeague.getContest());		
		newEntity.setRegion(regionEntity);

		leagueDao.persist(newEntity);
		
		return newEntity;
	}

	private LinkedList<League> getDefault(List<LeagueEntity> entities) {
		LinkedList<League> bos = new LinkedList<League>();
		entities.forEach(e -> bos.add(League.builder().entity(e).build()));
		return bos;
	}
}
