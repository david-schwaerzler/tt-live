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

import com.ttlive.bo.GameStyle;
import com.ttlive.dto.GameStyleDto;
import com.ttlive.service.GameStyleService;

@Stateless
@Path("/game_style")
public class GameStyleReceiver {

	@EJB
	private GameStyleService gameStyleService;

	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response findAll() {
		LinkedList<GameStyle> gameStyles = gameStyleService.findAll();
		return Response.ok(GameStyleDto.fromBos(gameStyles)).build();
	}
}
