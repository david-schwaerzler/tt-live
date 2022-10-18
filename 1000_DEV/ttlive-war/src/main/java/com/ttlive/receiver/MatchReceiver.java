package com.ttlive.receiver;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import com.ttlive.bo.League;
import com.ttlive.bo.Match;
import com.ttlive.bo.RequestMatch;
import com.ttlive.bo.Team;
import com.ttlive.dto.MatchDto;
import com.ttlive.dto.RequestMatchDto;
import com.ttlive.service.MatchService;
import com.ttlive.utils.LeagueContest;

@Stateless
@Path("/match")
public class MatchReceiver {

	@EJB
	private MatchService matchService;

	@POST
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response create(RequestMatchDto requestMatchDto) {

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
				.build();

		Match match = matchService.create(requestMatch);

		return Response.ok(MatchDto.builder().bo(match).build()).build();

	}
}
