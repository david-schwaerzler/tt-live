package com.ttlive.receiver.secured;

import java.util.List;

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
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.ttlive.bo.AccountFilter;
import com.ttlive.bo.AccountFilterSet;
import com.ttlive.bo.request.RequestAccountFilter;
import com.ttlive.bo.request.RequestAccountFilterSet;
import com.ttlive.dto.AccountFilterDto;
import com.ttlive.dto.AccountFilterSetDto;
import com.ttlive.dto.request.RequestAccountFilterDto;
import com.ttlive.dto.request.RequestAccountFilterSetDto;
import com.ttlive.exceptions.BadRestRequestException;
import com.ttlive.service.AccountFilterService;
import com.ttlive.service.AccountFilterSetService;

@Path("/secured/filterSet")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@Stateless
public class AccountFIlterSetReceiver extends BaseSecuredReceiver {

	
	@EJB
	private AccountFilterSetService filterSetService;

	@EJB
	private AccountFilterService filterService;
	
	@GET
	@Path("")
	public Response get() throws BadRestRequestException {

		String username = getUsername();

		List<AccountFilterSet> filterSets = filterSetService.getFilterSet(username);
		return Response.ok(AccountFilterSetDto.fromBos(filterSets)).build();
	}

	@POST
	@Path("")
	public Response create(RequestAccountFilterSetDto requestDto) throws BadRestRequestException {

		String username = getUsername();
		if (requestDto.getName() == null || requestDto.getName().equals(""))
			throw new BadRestRequestException("name", "Name is required and must be non empty");

		RequestAccountFilterSet filterSet = RequestAccountFilterSet.builder() //
				.name(requestDto.getName()) //
				.isActive(requestDto.isActive()) //
				.isDefault(requestDto.isDefault()) //
				.build();

		AccountFilterSet createdSet = filterSetService.createFilterSet(username, filterSet);
		return Response.ok(AccountFilterSetDto.builder().bo(createdSet).build()).build();
	}

	@PUT
	@Path("{id}")
	public Response update(@PathParam("id") long id, RequestAccountFilterSetDto requestDto)
			throws BadRestRequestException {
		String username = getUsername();
		if (requestDto.getName() == null || requestDto.getName().equals(""))
			throw new BadRestRequestException("name", "Name is required and must be non empty");

		RequestAccountFilterSet filterSet = RequestAccountFilterSet.builder() //
				.name(requestDto.getName()) //
				.isActive(requestDto.isActive()) //
				.isDefault(requestDto.isDefault()) //
				.build();

		AccountFilterSet createdSet = filterSetService.updateFilterSet(username, id, filterSet);
		return Response.ok(AccountFilterSetDto.builder().bo(createdSet).build()).build();

	}

	@DELETE
	@Path("{id}")
	public Response delete(@PathParam("id") long id) throws BadRestRequestException {
		String username = getUsername();

		filterSetService.removeFilterSet(username, id);
		return Response.ok().build();
	}
	
	@POST
	@Path("{filterSetId}/filter")
	public Response createFilter(@PathParam("filterSetId") long filterSetId, RequestAccountFilterDto requestDto) throws BadRestRequestException {

		String username = getUsername();
		
		if (requestDto.getType() == null)
			throw new BadRestRequestException("type", "Type is required and must be non empty");
		
		if(requestDto.getValue() == null || requestDto.getValue().equals(""))
			throw new BadRestRequestException("value", "Value is required and must be non empty");

		
		RequestAccountFilter requestBo = RequestAccountFilter.builder() //
				.type(requestDto.getType()) //
				.value(requestDto.getValue()) //
				.build();
		
		AccountFilter createdSet = filterService.create(username, filterSetId, requestBo);
		return Response.ok(AccountFilterDto.builder().bo(createdSet).build()).build();
	}	

	@DELETE
	@Path("{filterSetId}/filter/{filterId}")
	public Response deleteFilter(@PathParam("filterSetId") long filterSetId, @PathParam("filterId") long id) throws BadRestRequestException {
		String username = getUsername();

		filterService.delete(username, filterSetId, id);
		return Response.ok().build();
	}
	

}
