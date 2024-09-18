package com.ttlive.receiver;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.ttlive.bo.Contact;
import com.ttlive.bo.request.RequestContact;
import com.ttlive.dto.ContactDto;
import com.ttlive.dto.request.RequestContactDto;
import com.ttlive.exceptions.BadRestRequestException;
import com.ttlive.service.ContactService;

@Stateless
@Path("contact")
public class ContactReceiver {

	@EJB
	private ContactService contactService;
	
	@POST
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response create(RequestContactDto requestDto) throws BadRestRequestException {
		
		if(requestDto.getText() == null || requestDto.getText().equals(""))
			throw new BadRestRequestException("text", "Text must be set and is not allowed to be empty");
		
		RequestContact requestBo = RequestContact.builder() //
				.text(requestDto.getText()) //
				.recipient(requestDto.getRecipient()) //
				.build();
		Contact bo = contactService.create(requestBo);
		ContactDto dto = ContactDto.builder().bo(bo).build();
		return Response.ok(dto).build();
	}
}