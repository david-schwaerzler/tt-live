package com.ttlive.receiver;

import java.util.LinkedList;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.ttlive.bo.ChatMessage;
import com.ttlive.bo.request.RequestChatMessage;
import com.ttlive.dto.ChatMessageDto;
import com.ttlive.dto.LiveCountDto;
import com.ttlive.dto.request.RequestChatMessageDto;
import com.ttlive.exceptions.BadRestRequestException;
import com.ttlive.hook.TTLiveWebSocket;
import com.ttlive.service.ChatMessageService;

@Stateless
@Path("/chat")
public class ChatMessageReceiver {

	@EJB
	private ChatMessageService messageService;
	
	@EJB
	private TTLiveWebSocket socketService;

	@GET
	@Path("{matchId}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response getMessages(@PathParam("matchId") long matchId) {
		LinkedList<ChatMessage> messages = messageService.findByMatch(matchId);
		return Response.ok(ChatMessageDto.fromBos(messages)).build();
	}
	
	@GET
	@Path("{matchId}/livecount")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response getLiveCount(@PathParam("matchId") long matchId) {
		long count = socketService.getUserCount(matchId);
		LiveCountDto dto = new LiveCountDto(count);		
		
		return Response.ok(dto).build();
	}

	@POST
	@Path("{matchId}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response create(@PathParam("matchId") long matchId, RequestChatMessageDto dto) throws BadRestRequestException {

		RequestChatMessage bo = RequestChatMessage.builder() //
				.username(dto.getUsername()) //
				.text(dto.getText()) //
				.isEditor(dto.isEditor())
				.build();

		ChatMessage messages = messageService.create(matchId, bo);
		return Response.ok(ChatMessageDto.builder().bo(messages).build()).build();
	}
	

}
