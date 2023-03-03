package com.ttlive.receiver;

import java.util.LinkedList;

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

import com.ttlive.bo.GameSet.InvalidGameSetFormat;
import com.ttlive.bo.Match;
import com.ttlive.dto.SimpleMatchDto;
import com.ttlive.dto.SimpleMatchDto.SimpleGameDto;
import com.ttlive.service.MatchService;
import com.ttlive.utils.BadRestRequestException;

@Stateless
@Path("/simple_match")
public class SimpleMatchReceiver {

	@EJB
	private MatchService matchService;

	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response findAll(@QueryParam("fields") String fieldsStr) throws InvalidGameSetFormat {

		String[] fields = null;
		if (fieldsStr != null) {
			fields = fieldsStr.split(",");
		}
		LinkedList<Match> matches = matchService.findPublic();
		return Response.ok(SimpleMatchDto.fromBos(matches, fields)).build();

	}

	@GET
	@Path("/{id}/games")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response findGames(@PathParam("id") long matchId, @QueryParam("fields") String fieldsStr) throws InvalidGameSetFormat, BadRestRequestException {
		Match match = matchService.findById(matchId);		
		return Response.ok(SimpleGameDto.fromBos(match.getGames(), null)).build();
	}

}
