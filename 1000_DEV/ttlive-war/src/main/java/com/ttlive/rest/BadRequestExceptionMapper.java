package com.ttlive.rest;

import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

import com.ttlive.exceptions.BadRestRequestException;

@Provider
public class BadRequestExceptionMapper implements ExceptionMapper<BadRestRequestException> {
	@Override
	public Response toResponse(BadRestRequestException exception) {
		return Response.status(400).entity(exception.getMessage()).build();
	}
}
