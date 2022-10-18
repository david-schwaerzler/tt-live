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

import com.ttlive.bo.Team;
import com.ttlive.dto.TeamDto;
import com.ttlive.service.TeamService;

@Stateless
public class TeamReceiver {
	
	@EJB
	private TeamService teamService;
	
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response findAll() {
		LinkedList<Team> teams = teamService.findAll();
		return Response.ok(TeamDto.fromBos(teams)).build();
	}
	
}
