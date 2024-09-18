package com.ttlive.receiver;

import java.util.LinkedList;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.ttlive.bo.League;
import com.ttlive.bo.Team;
import com.ttlive.dto.LeagueDto;
import com.ttlive.dto.TeamDto;
import com.ttlive.service.LeagueService;

@Stateless
@Path("/league")
public class LeagueReceiver {
	
	@EJB
	private LeagueService leagueService;
	
	
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response findAll() {
		LinkedList<League> leagues = leagueService.findAll();
		return Response.ok(LeagueDto.fromBos(leagues)).build();
	}
	
	@GET
	@Path("/{id}/teams")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response findTeams(@PathParam("id") long id) {
		LinkedList<Team> teams= leagueService.findTeams(id);
		return Response.ok(TeamDto.fromBos(teams)).build();
	}
}
