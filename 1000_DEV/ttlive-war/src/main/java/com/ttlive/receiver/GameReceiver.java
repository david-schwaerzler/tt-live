package com.ttlive.receiver;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ws.rs.Consumes;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.ttlive.bo.Game;
import com.ttlive.bo.GameSet.InvalidGameSetFormat;
import com.ttlive.bo.RequestGameSet;
import com.ttlive.dto.GameDto;
import com.ttlive.dto.RequestGametSetDto;
import com.ttlive.rest.InvalidEditorCodeException;
import com.ttlive.service.GameService;
import com.ttlive.utils.BadRestRequestException;

@Stateless
@Path("/game")
public class GameReceiver {

	@EJB
	private GameService gameService;

	@PUT
	@Path("/{id}/set")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response updateSet(@PathParam("id") long id, @QueryParam("editorCode") String editorCode,
			RequestGametSetDto requestGameSetDto) throws InvalidGameSetFormat, InvalidEditorCodeException, BadRestRequestException {

		if (editorCode == null || !gameService.isEditorCodeValid(id, editorCode)) {
			throw new InvalidEditorCodeException(editorCode, id);
		}

		RequestGameSet requestGameSet = RequestGameSet.builder() //
				.number(requestGameSetDto.getNumber()) //
				.homeScore(requestGameSetDto.getHomeScore()) //
				.guestScore(requestGameSetDto.getGuestScore()) //
				.build();

		Game game = gameService.updateSet(id, requestGameSet);

		return Response.ok(GameDto.builder().bo(game).build()).build();
	}
}
