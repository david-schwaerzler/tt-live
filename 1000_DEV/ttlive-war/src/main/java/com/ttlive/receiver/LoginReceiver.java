package com.ttlive.receiver;

import java.security.Principal;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

import com.ttlive.dto.LoginResponseDto;
import com.ttlive.dto.request.RequestLoginDto;
import com.ttlive.rest.JwtFactory;
import com.ttlive.service.AccountService;
import com.ttlive.service.AccountService.LoginStatus;
import com.ttlive.utils.BadRestRequestException;

import net.minidev.json.JSONObject;

@Stateless
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Path("login")
public class LoginReceiver {

	@EJB
	private AccountService service;
	
	@Context
	private SecurityContext context;

	private JwtFactory jwtFactory = new JwtFactory();

	@POST
	@Path("/")
	public Response login(RequestLoginDto dto) throws Exception {

		if (dto.getUsername() == null)
			throw new BadRestRequestException("username", "Username must be set");
		else if (dto.getPassword() == null)
			throw new BadRestRequestException("password", "Password must be set");

		LoginStatus loginStatus = service.login(dto.getUsername(), dto.getPassword());
		LoginResponseDto loginResponseDto;
		if (loginStatus != LoginStatus.SUCCESS) {
			loginResponseDto = LoginResponseDto.builder().status(loginStatus.toString()).token(null).build();
		} else {
			String token = jwtFactory.createUserJwt(dto.getUsername());
			loginResponseDto = LoginResponseDto.builder().status(loginStatus.toString()).token(token).build();
		}
		return Response.ok(loginResponseDto).build();
	}
	
	
	@POST
	@Path("/renew")
	public Response renewToken() throws Exception {

		Principal principal = context.getUserPrincipal();
		if(principal == null) 
			throw new BadRestRequestException("token", "Principal coudn't be determined for the request. Make sure to use the Authentifikation Bearer Header");
		
		String token = jwtFactory.createUserJwt(principal.getName());
		JSONObject object = new JSONObject();
		object.put("token", token);
		return Response.ok(object).build();
	}
}
