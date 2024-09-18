package com.ttlive.receiver;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.ttlive.bo.League;
import com.ttlive.bo.Region;
import com.ttlive.dto.LeagueDto;
import com.ttlive.dto.RegionDto;
import com.ttlive.service.RegionService;

@Stateless
@Path("/region")
public class RegionReceiver {
	
	@EJB
	private RegionService regionService;

	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response findAll() {
		LinkedList<Region> bos = regionService.findAll();
		return Response.ok(RegionDto.fromBos(bos)).build();
	}

	@GET
	@Path("/{id}/leagues")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response findLeagues(@PathParam("id") long regionId, @QueryParam("contest") String contest) {		
		List<League> bos = regionService.findLeagues(regionId);
		if(contest!= null) {
			bos = bos.stream().filter(l -> l.getContest().toString().equals(contest)).collect(Collectors.toList());
		}
		
		return Response.ok(LeagueDto.fromBos(bos)).build();
	}

}
