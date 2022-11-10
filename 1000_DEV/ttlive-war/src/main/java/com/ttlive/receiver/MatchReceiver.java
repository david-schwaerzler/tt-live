package com.ttlive.receiver;

import java.util.LinkedList;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.json.JSONObject;

import com.ttlive.bo.GameSet.InvalidGameSetFormat;
import com.ttlive.bo.League;
import com.ttlive.bo.Match;
import com.ttlive.bo.RequestLineup;
import com.ttlive.bo.RequestLineup.RequestDoubles;
import com.ttlive.bo.RequestLineup.RequestPlayer;
import com.ttlive.bo.RequestMatch;
import com.ttlive.bo.Team;
import com.ttlive.dto.MatchDto;
import com.ttlive.dto.RequestLineupDto;
import com.ttlive.dto.RequestMatchDto;
import com.ttlive.rest.InvalidEditorCodeException;
import com.ttlive.dto.RequestLineupDto.RequestDoublesDto;
import com.ttlive.dto.RequestLineupDto.RequestPlayerDto;
import com.ttlive.service.MatchService;
import com.ttlive.utils.LeagueContest;

@Stateless
@Path("/match")
public class MatchReceiver {

	@EJB
	private MatchService matchService;

	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response findAll() throws InvalidGameSetFormat {
		LinkedList<Match> matches = matchService.findAll();
		return Response.ok(MatchDto.fromBos(matches)).build();
	}

	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response findById(@PathParam("id") long id) throws InvalidGameSetFormat {
		Match match = matchService.findById(id);
		return Response.ok(MatchDto.builder().bo(match).build()).build();
	}

	@POST
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response create(RequestMatchDto requestMatchDto) throws InvalidGameSetFormat {

		if (requestMatchDto.getContest() == null
				|| (!requestMatchDto.getContest().equals("WOMEN") && !requestMatchDto.getContest().equals("MEN"))) {
			return Response.status(Status.BAD_REQUEST).entity("Contest must be set and eather be 'WOMEN' or 'MEN'")
					.build();
		}

		if (requestMatchDto.getGuestTeam() == null) {
			return Response.status(Status.BAD_REQUEST).entity("guestTeam must be set").build();
		}
		if (requestMatchDto.getHomeTeam() == null) {
			return Response.status(Status.BAD_REQUEST).entity("homeTeam must be set").build();
		}
		if (requestMatchDto.getLeague() == null) {
			return Response.status(Status.BAD_REQUEST).entity("league must be set").build();
		}
		if (requestMatchDto.getStartDate() == null) {
			return Response.status(Status.BAD_REQUEST).entity("startDate must be set").build();
		}

		League league = League.builder() //
				.id(requestMatchDto.getLeague().getId()) //
				.name(requestMatchDto.getLeague().getName()) //
				.contest(requestMatchDto.getLeague().getContest()) //
				.build();

		Team homeTeam = Team.builder() //
				.id(requestMatchDto.getHomeTeam().getId()) //
				.club(requestMatchDto.getHomeTeam().getClub()) //
				.number(requestMatchDto.getHomeTeam().getNumber()) //
				.build();

		Team guestTeam = Team.builder() //
				.id(requestMatchDto.getGuestTeam().getId()) //
				.club(requestMatchDto.getGuestTeam().getClub()) //
				.number(requestMatchDto.getGuestTeam().getNumber()) //
				.build();

		RequestMatch requestMatch = RequestMatch.builder() //
				.regionId(requestMatchDto.getRegionId()) //
				.contest(requestMatchDto.getContest().equals("WOMEN") ? LeagueContest.WOMEN : LeagueContest.MEN) //
				.gameStyleId(requestMatchDto.getGameStyleId()) //
				.league(league) //
				.homeTeam(homeTeam) //
				.guestTeam(guestTeam) //
				.startDate(requestMatchDto.getStartDate())//
				.build();

		Match match = matchService.create(requestMatch);

		MatchDto matchDto = MatchDto.builder() //
				.bo(match) //
				.editorCode(match.getEditorCode()) //
				.build();

		return Response.ok(matchDto).build();
	}

	@GET
	@Path("/{id}/validate")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response isEditorCodeValid(@PathParam("id") long id, @QueryParam("editorCode") String editorCode) {
		if (editorCode == null)
			return Response.status(Status.BAD_REQUEST).entity("No editorCode was provided in the path").build();

		boolean isEditorCodeValid = matchService.isEditorCodeValid(id, editorCode);
		JSONObject ret = new JSONObject();
		ret.put("valid", isEditorCodeValid);
		return Response.ok(ret.toString()).build();
	}

	@PUT
	@Path("/{id}/lineup")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response updateLineup(@PathParam("id") long id, @QueryParam("editorCode") String editorCode,
			RequestLineupDto lineupDto) throws InvalidGameSetFormat, InvalidEditorCodeException {

		if (editorCode == null || !matchService.isEditorCodeValid(id, editorCode)) {
			throw new InvalidEditorCodeException(editorCode, id);
		}

		LinkedList<RequestDoubles> doubles = new LinkedList<>();
		for (RequestDoublesDto dto : lineupDto.getDoubles()) {
			doubles.add(RequestDoubles.builder() //
					.id(dto.getId()) //
					.player1(dto.getPlayer1()) //
					.player2(dto.getPlayer2()) //
					.build());
		}

		LinkedList<RequestPlayer> players = new LinkedList<>();
		for (RequestPlayerDto dto : lineupDto.getPlayers()) {
			players.add(RequestPlayer.builder() //
					.id(dto.getId()) //
					.name(dto.getName()) //
					.build());
		}

		RequestLineup requestLineup = RequestLineup.builder() //
				.doubles(doubles) //
				.players(players) //
				.build();

		Match match = matchService.updateLineup(id, requestLineup);
		return Response.ok(MatchDto.builder().bo(match).build()).build();
	}
}
