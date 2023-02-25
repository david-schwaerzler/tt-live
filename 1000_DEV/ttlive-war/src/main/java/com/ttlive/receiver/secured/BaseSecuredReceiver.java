package com.ttlive.receiver.secured;

import java.security.Principal;

import javax.ws.rs.core.Context;
import javax.ws.rs.core.SecurityContext;

import com.ttlive.utils.BadRestRequestException;

public class BaseSecuredReceiver {
	@Context
	private SecurityContext context;
	
	
	public String getUsername() throws BadRestRequestException {
		Principal principal = context.getUserPrincipal();
		if (principal == null || principal.getName().equals("") == true)
			throw new BadRestRequestException("bearer-token",
					"Principal coudn't be determined for the request. Make sure to use the Authentifikation Bearer Header");
		return principal.getName();
	}
}
