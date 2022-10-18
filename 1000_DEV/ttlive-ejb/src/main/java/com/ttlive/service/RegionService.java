package com.ttlive.service;

import java.util.LinkedList;
import java.util.List;

import javax.ejb.EJB;
import javax.ejb.Stateless;

import com.ttlive.bo.League;
import com.ttlive.bo.Region;
import com.ttlive.persistence.dao.RegionDao;
import com.ttlive.persistence.entity.RegionEntity;

@Stateless
public class RegionService {

	@EJB
	private RegionDao regionDao;

	public LinkedList<Region> findAll() {
		List<RegionEntity> regions = regionDao.findAll();
		return getDefault(regions);
	}

	public LinkedList<League> findLeagues(long regionId) {
		RegionEntity region = regionDao.findById(regionId);
		if (region == null)
			throw new NullPointerException("Region with id='" + regionId + "' doesn't exist");

		LinkedList<League> leagues = new LinkedList<League>();
		region.getLeagues().forEach(l -> leagues.add(League.builder().entity(l).region(l.getRegion()).build()));
		return leagues;
	}

	public LinkedList<Region> getDefault(List<RegionEntity> entities) {
		LinkedList<Region> regions = new LinkedList<Region>();
		entities.forEach(e -> regions.add(Region.builder().entity(e).build()));
		return regions;
	}

}
