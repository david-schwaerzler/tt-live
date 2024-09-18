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

import com.ttlive.bo.Player;
import com.ttlive.dto.PlayerDto;
import com.ttlive.service.PlayerService;

@Stateless
public class PlayerReceiver {

	@EJB
	private PlayerService playerService;
	
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response findAll() {
		LinkedList<Player> player = playerService.findAll();
		return Response.ok(PlayerDto.fromBos(player)).build();
	}
}
