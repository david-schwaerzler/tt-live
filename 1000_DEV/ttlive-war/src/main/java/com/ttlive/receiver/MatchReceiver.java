package com.ttlive.receiver;

import java.security.Principal;
import java.time.ZoneId;
import java.util.LinkedList;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.core.Response.Status;

import org.json.JSONObject;

import com.ttlive.bo.GameSet.InvalidGameSetFormat;
import com.ttlive.bo.Match;
import com.ttlive.bo.request.RequestLeague;
import com.ttlive.bo.request.RequestLineup;
import com.ttlive.bo.request.RequestLineup.RequestDoubles;
import com.ttlive.bo.request.RequestLineup.RequestPlayer;
import com.ttlive.bo.request.RequestMatch;
import com.ttlive.bo.request.RequestTeam;
import com.ttlive.dto.MatchDto;
import com.ttlive.dto.request.RequestLineupDto;
import com.ttlive.dto.request.RequestMatchDto;
import com.ttlive.dto.request.RequestLineupDto.RequestDoublesDto;
import com.ttlive.dto.request.RequestLineupDto.RequestPlayerDto;
import com.ttlive.rest.InvalidEditorCodeException;
import com.ttlive.service.MatchService;
import com.ttlive.utils.BadRestRequestException;
import com.ttlive.utils.LeagueContest;

@Stateless
@Path("/match")
public class MatchReceiver {

	@EJB
	private MatchService matchService;
	
	@Context
	private SecurityContext context;

	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response findPublic() throws InvalidGameSetFormat {
		LinkedList<Match> matches = matchService.findPublic();
		return Response.ok(MatchDto.fromBos(matches)).build();
	}

	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response findById(@PathParam("id") long id) throws InvalidGameSetFormat, BadRestRequestException {
		Match match = matchService.findById(id);
		return Response.ok(MatchDto.builder().bo(match).build()).build();
	}

	@POST
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response create(RequestMatchDto requestMatchDto) throws InvalidGameSetFormat, BadRestRequestException {

		validateRequestMatch(requestMatchDto);

		RequestLeague league = RequestLeague.builder() //
				.id(requestMatchDto.getLeague().getId()) //
				.name(requestMatchDto.getLeague().getName()) //
				.contest(LeagueContest.valueOf(requestMatchDto.getLeague().getContest())) //
				.regionId(requestMatchDto.getLeague().getRegionId()) ///
				.build();

		RequestTeam homeTeam = RequestTeam.builder() //
				.id(requestMatchDto.getHomeTeam().getId()) //
				.club(requestMatchDto.getHomeTeam().getClub()) //
				.number(requestMatchDto.getHomeTeam().getNumber()) //
				.build();

		RequestTeam guestTeam = RequestTeam.builder() //
				.id(requestMatchDto.getGuestTeam().getId()) //
				.club(requestMatchDto.getGuestTeam().getClub()) //
				.number(requestMatchDto.getGuestTeam().getNumber()) //
				.build();

		RequestMatch requestMatch = RequestMatch.builder() //
				.gameStyleId(requestMatchDto.getGameStyleId()) //
				.league(league) //
				.homeTeam(homeTeam) //
				.guestTeam(guestTeam) //
				.visibility(requestMatchDto.getVisibility())
				.startDate(requestMatchDto.getStartDate().withZoneSameInstant(ZoneId.of("Europe/Berlin"))
						.toLocalDateTime())//
				.build();
		
		Principal userPrincipal = context.getUserPrincipal();
		if(userPrincipal != null && userPrincipal.getName() != null && userPrincipal.getName().equals("") == false) {
			requestMatch.setAccountUsername(userPrincipal.getName());
		}

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
	public Response isEditorCodeValid(@PathParam("id") long id, @QueryParam("editorCode") String editorCode)
			throws BadRestRequestException {
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
			RequestLineupDto lineupDto)
			throws InvalidGameSetFormat, InvalidEditorCodeException, BadRestRequestException {

		if (editorCode == null || !matchService.isEditorCodeValid(id, editorCode)) {
			throw new InvalidEditorCodeException(editorCode, id);
		}

		if (lineupDto.getDoubles() == null)
			return Response.status(Status.BAD_REQUEST).entity("doubles must be set").build();

		if (lineupDto.getPlayers() == null)
			return Response.status(Status.BAD_REQUEST).entity("player must be set").build();

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

	@PUT
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response updateMatch(@PathParam("id") long id, @QueryParam("editorCode") String editorCode,
			RequestMatchDto requestMatchDto)
			throws InvalidGameSetFormat, InvalidEditorCodeException, BadRestRequestException {

		if (editorCode == null || !matchService.isEditorCodeValid(id, editorCode)) {
			throw new InvalidEditorCodeException(editorCode, id);
		}

		validateRequestMatch(requestMatchDto);

		RequestLeague league = RequestLeague.builder() //
				.id(requestMatchDto.getLeague().getId()) //
				.name(requestMatchDto.getLeague().getName()) //
				.contest(LeagueContest.valueOf(requestMatchDto.getLeague().getContest())) //
				.regionId(requestMatchDto.getLeague().getRegionId()) //
				.build();

		RequestTeam homeTeam = RequestTeam.builder() //
				.id(requestMatchDto.getHomeTeam().getId()) //
				.club(requestMatchDto.getHomeTeam().getClub()) //
				.number(requestMatchDto.getHomeTeam().getNumber()) //
				.build();

		RequestTeam guestTeam = RequestTeam.builder() //
				.id(requestMatchDto.getGuestTeam().getId()) //
				.club(requestMatchDto.getGuestTeam().getClub()) //
				.number(requestMatchDto.getGuestTeam().getNumber()) //
				.build();

		RequestMatch requestMatch = RequestMatch.builder() //				
				.gameStyleId(requestMatchDto.getGameStyleId()) //
				.league(league) //
				.homeTeam(homeTeam) //
				.guestTeam(guestTeam) //
				.visibility(requestMatchDto.getVisibility()) //
				.startDate(requestMatchDto.getStartDate().withZoneSameInstant(ZoneId.of("Europe/Berlin"))
						.toLocalDateTime())//
				.build();
		
		Principal userPrincipal = context.getUserPrincipal();
		if(userPrincipal != null && userPrincipal.getName() != null && userPrincipal.getName().equals("") == false) {
			requestMatch.setAccountUsername(userPrincipal.getName());
		}

		Match match = matchService.updateMatch(id, requestMatch);
		return Response.ok(MatchDto.builder().bo(match).build()).build();
	}
	
	@DELETE
	@Path("/{id}")
	public Response delete(@PathParam("id") long id, @QueryParam("editorCode") String editorCode) throws InvalidEditorCodeException, BadRestRequestException {
		
		if (editorCode == null || !matchService.isEditorCodeValid(id, editorCode)) {
			throw new InvalidEditorCodeException(editorCode, id);
		}
		
		Principal userPrincipal = context.getUserPrincipal();
		String username = null;
		if(userPrincipal != null && userPrincipal.getName() != null && userPrincipal.getName().equals("") == false) {
			username = userPrincipal.getName();
		}
		
		matchService.delete(id, username);
		return Response.ok().build();
		
	}
	

	private void validateRequestMatch(RequestMatchDto requestMatchDto)
			throws BadRestRequestException {
	

		if (requestMatchDto.getLeague() == null)
			throw new BadRestRequestException("league", "League must be set");

		if (requestMatchDto.getLeague().getContest() == null
				|| (requestMatchDto.getLeague().getContest().equals("WOMEN") == false
						&& requestMatchDto.getLeague().getContest().equals("MEN") == false))
			throw new BadRestRequestException("contest", "Invalid value for league contest");

		if (requestMatchDto.getLeague().getName() == null || requestMatchDto.getLeague().getName().isEmpty())
			throw new BadRestRequestException("name", "Name of the league must set and not empty");

		if (requestMatchDto.getHomeTeam() == null)
			throw new BadRestRequestException("homeTeam", "HomeTeam must be set");

		if (requestMatchDto.getHomeTeam().getClub() == null || requestMatchDto.getHomeTeam().getClub().isEmpty())
			throw new BadRestRequestException("club", "Club in homeTeam must be set and not empty");

		if (requestMatchDto.getGuestTeam() == null)
			throw new BadRestRequestException("guestTeam", "GuestTeam must be set");

		if (requestMatchDto.getGuestTeam().getClub() == null || requestMatchDto.getGuestTeam().getClub().isEmpty())
			throw new BadRestRequestException("club", "Club in guestTeam must be set and not empty");

		if (requestMatchDto.getStartDate() == null)
			throw new BadRestRequestException("startDate", "Startdate must be set");		
	}
}
