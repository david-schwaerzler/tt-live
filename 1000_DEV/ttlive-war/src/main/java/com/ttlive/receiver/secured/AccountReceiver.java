package com.ttlive.receiver.secured;

import java.security.Principal;

import javax.annotation.security.RolesAllowed;
import javax.ejb.Stateless;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

import net.minidev.json.JSONObject;

@Stateless
@Path("/secured/account")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AccountReceiver {

	@Context
	private SecurityContext context;

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
}
