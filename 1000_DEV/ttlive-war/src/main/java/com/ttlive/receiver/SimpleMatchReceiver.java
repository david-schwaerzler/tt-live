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

import com.ttlive.bo.GameSet.InvalidGameSetFormat;
import com.ttlive.bo.Match;
import com.ttlive.dto.SimpleMatchDto;
import com.ttlive.service.MatchService;

@Stateless
@Path("/simple_match")
public class SimpleMatchReceiver {


	@EJB
	private MatchService matchService;
	
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response findAll() throws InvalidGameSetFormat {
		LinkedList<Match> matches = matchService.findAll();
		return Response.ok(SimpleMatchDto.fromBos(matches)).build();
	}
	
}
