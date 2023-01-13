package com.ttlive.receiver;

import java.security.Principal;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.mail.internet.InternetAddress;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

import com.ttlive.bo.Account;
import com.ttlive.bo.LoginResponse;
import com.ttlive.bo.request.RequestAccount;
import com.ttlive.dto.AccountDto;
import com.ttlive.dto.LoginResponseDto;
import com.ttlive.dto.request.RequestLoginDto;
import com.ttlive.dto.request.RequestAccountDto;
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
	@Path("register")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response register(RequestAccountDto requestAccountDto) throws Exception {

		if (requestAccountDto.getUsername() == null || requestAccountDto.getUsername().equals(""))
			throw new BadRestRequestException("username", "username must be set and not empty");

		if (requestAccountDto.getPassword() == null || requestAccountDto.getPassword().equals(""))
			throw new BadRestRequestException("password", "password must be set and not empty");

		if (requestAccountDto.getEmail() == null || validateEmail(requestAccountDto.getEmail()) == false)
			throw new BadRestRequestException("email", "Email must bet set and in the right format");

		RequestAccount requestAccount = RequestAccount.builder() //
				.username(requestAccountDto.getUsername()) //
				.password(requestAccountDto.getPassword()) //
				.email(requestAccountDto.getEmail()) //
				.build();

		Account account = service.register(requestAccount);

		return Response.ok(AccountDto.builder().bo(account).build()).build();
	}

	@POST
	@Path("")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response login(RequestLoginDto dto) throws Exception {

		if (dto.getUsername() == null)
			throw new BadRestRequestException("username", "Username must be set");
		else if (dto.getPassword() == null)
			throw new BadRestRequestException("password", "Password must be set");

		LoginResponse loginResponse = service.login(dto.getUsername(), dto.getPassword());
		LoginResponseDto loginResponseDto;
		if (loginResponse.getStatus() != LoginStatus.SUCCESS) {
			loginResponseDto = LoginResponseDto.builder() //
					.status(loginResponse.getStatus().toString()) //
					.token(null) //
					.build();
		} else {
			String token = jwtFactory.createUserJwt(dto.getUsername());
			loginResponseDto = LoginResponseDto.builder() //
					.status(loginResponse.getStatus().toString()) //
					.token(token) //
					.account(AccountDto.builder().bo(loginResponse.getAccount()).build()) //
					.build();
		}
		return Response.ok(loginResponseDto).build();
	}

	@GET
	@Path("isTaken")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response isUsernameTaken(@QueryParam("username") String username) throws BadRestRequestException {
		if (username == null || username.equals(""))
			throw new BadRestRequestException("username", "Username must be provided as a query parameter");

		boolean isTaken = service.isUsernameTaken(username);
		return Response.ok(isTaken).build();
	}

	@POST
	@Path("/renew")
	public Response renewToken() throws Exception {

		Principal principal = context.getUserPrincipal();
		if (principal == null)
			throw new BadRestRequestException("token",
					"Principal coudn't be determined for the request. Make sure to use the Authentifikation Bearer Header");

		String token = jwtFactory.createUserJwt(principal.getName());
		JSONObject object = new JSONObject();
		object.put("token", token);
		return Response.ok(object).build();
	}

	private boolean validateEmail(String email) {
		try {
			InternetAddress emailAddr = new InternetAddress(email);
			emailAddr.validate();
			return true;
		} catch (Exception e) {
			return false;
		}
	}
}
