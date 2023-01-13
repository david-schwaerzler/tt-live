package com.ttlive.receiver.secured;

import java.security.Principal;

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
import com.ttlive.dto.AccountDto;
import com.ttlive.rest.InvalidEditorCodeException;
import com.ttlive.service.AccountService;
import com.ttlive.utils.BadRestRequestException;

import net.minidev.json.JSONObject;

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
	public Response secret() throws Exception {
		JSONObject json = new JSONObject();
		Principal userPrincipal = context.getUserPrincipal();
		String principalName = userPrincipal == null ? "anonymous" : userPrincipal.getName();
		json.put("user", principalName);
		return Response.ok(json.toJSONString()).build();
	}

	@PUT
	@RolesAllowed({ "user" })
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("match/{matchId}/connect")
	public Response connectMatch(@PathParam("matchId") long id, @QueryParam("editorCode") String editorCode)
			throws InvalidEditorCodeException, BadRestRequestException {

		if (editorCode == null || accountService.isEditorCodeValid(id, editorCode) == false)
			throw new InvalidEditorCodeException(editorCode, id);

		Principal userPrincipal = context.getUserPrincipal();
		Account account = accountService.connectMatch(userPrincipal.getName(), id);
		return Response.ok(AccountDto.builder().bo(account).build()).build();
	}
}
