package com.ttlive.receiver;

import java.util.LinkedList;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.ttlive.bo.League;
import com.ttlive.dto.LeagueDto;
import com.ttlive.service.LeagueService;

@Stateless
@Path("/")
public class LeagueReceiver {
	
	@EJB
	private LeagueService leagueService;
	
	
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response findLeagues() {
		LinkedList<League> bos= leagueService.findLeagues();
		LinkedList<LeagueDto> dtos = LeagueDto.fromBos(bos);
		return Response.ok(dtos).build();
	}

}
