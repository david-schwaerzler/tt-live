package com.ttlive.receiver.secured;

import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.security.RolesAllowed;
import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

import com.ttlive.bo.Account;
import com.ttlive.bo.GameSet.InvalidGameSetFormat;
import com.ttlive.bo.Match;
import com.ttlive.dto.AccountDto;
import com.ttlive.dto.EditorCodeDto;
import com.ttlive.dto.SimpleMatchDto;
import com.ttlive.rest.InvalidEditorCodeException;
import com.ttlive.service.AccountService;
import com.ttlive.utils.BadRestRequestException;

@Stateless
@Path("/secured/account")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AccountReceiver {

	@Context
	private SecurityContext context;

	@EJB
	private AccountService accountService;

	@GET
	@RolesAllowed({ "user" })
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("match")
	public Response getMatches(@QueryParam("fields") String fieldsStr) throws Exception {
		
		String[] fields = null;
		if (fieldsStr != null) {
			fields = fieldsStr.split(",");
		}

		Principal principal = context.getUserPrincipal();
		if (principal == null || principal.getName().equals("") == true)
			throw new BadRestRequestException("bearer-token",
					"Principal coudn't be determined for the request. Make sure to use the Authentifikation Bearer Header");

		List<Match> matches = accountService.getMatches(principal.getName());

		return Response.ok(SimpleMatchDto.fromBos(matches, fields)).build();
	}

	@PUT
	@RolesAllowed({ "user" })
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("match/{matchId}/connect")
	public Response connectMatch(@PathParam("matchId") long id, @QueryParam("editorCode") String editorCode)
			throws InvalidEditorCodeException, BadRestRequestException, InvalidGameSetFormat {

		if (editorCode == null || accountService.isEditorCodeValid(id, editorCode) == false)
			throw new InvalidEditorCodeException(editorCode, id);

		Principal userPrincipal = context.getUserPrincipal();
		Account account = accountService.connectMatch(userPrincipal.getName(), id);
		return Response.ok(AccountDto.builder().bo(account).build()).build();
	}
	
	@GET
	@RolesAllowed({ "user" })
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("editorCode")
	public Response getEditoCodes()
			throws InvalidEditorCodeException, BadRestRequestException, InvalidGameSetFormat {
	
		Principal principal = context.getUserPrincipal();
		if (principal == null || principal.getName().equals("") == true)
			throw new BadRestRequestException("bearer-token",
					"Principal coudn't be determined for the request. Make sure to use the Authentifikation Bearer Header");

		List<Match> matches = accountService.getMatches(principal.getName());
		
		List<EditorCodeDto> editorCodes = matches.stream().map(m -> new EditorCodeDto(m.getId(), m.getEditorCode())).collect(Collectors.toList()); 

		return Response.ok(editorCodes).build();
	}
}
