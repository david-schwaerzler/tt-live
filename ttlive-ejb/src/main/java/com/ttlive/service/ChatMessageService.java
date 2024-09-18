package com.ttlive.service;

import java.util.LinkedList;
import java.util.List;

import javax.ejb.EJB;
import javax.ejb.Stateless;

import com.ttlive.bo.ChatMessage;
import com.ttlive.bo.request.RequestChatMessage;
import com.ttlive.exceptions.BadRestRequestException;
import com.ttlive.persistence.dao.ChatMessageDao;
import com.ttlive.persistence.dao.MatchDao;
import com.ttlive.persistence.entity.ChatMessageEntity;
import com.ttlive.persistence.entity.MatchEntity;
import com.ttlive.session.MatchEventObserver;

@Stateless
public class ChatMessageService {

	@EJB
	private MatchEventObserver eventObserver;

	@EJB
	private ChatMessageDao messageDao;
	
	@EJB
	private MatchDao matchDao;

	public LinkedList<ChatMessage> findByMatch(long matchId) {
		List<ChatMessageEntity> entities = messageDao.findByMatch(matchId);
		LinkedList<ChatMessage> bos = new LinkedList<>();
		entities.forEach(e -> bos.add(ChatMessage.builder().entity(e).build()));
		return bos;
	}
	
	public ChatMessage create(long matchId, RequestChatMessage requestMessage) throws BadRestRequestException {
		
		if(requestMessage.getUsername() == null)
			throw new BadRestRequestException("username", "Username must be provided");
		
		if(requestMessage.getText() == null)
			throw new BadRestRequestException("text", "text must be provided");
		
		if(requestMessage.getUsername().length() >= 64) 
			throw new BadRestRequestException("username", "username must be less than 64 chard");
		
		if(requestMessage.getText().length() >= 256)
			throw new BadRestRequestException("text", "text must be less than 64 chard");
		
		MatchEntity match = matchDao.findById(matchId);
		if(match == null)
			throw new BadRestRequestException("matchId", "Match with the given matchId='" + matchId + "' doesn't exist");
				
		
		ChatMessageEntity entity = new ChatMessageEntity();
		entity.setUsername(requestMessage.getUsername());
		entity.setText(requestMessage.getText());
		entity.setMatch(match);	
		entity.setEditor(requestMessage.isEditor());
		
		messageDao.persist(entity);
		
		ChatMessage message = ChatMessage.builder().entity(entity).build();
		eventObserver.fireChatMessage(matchId, message);
		return message;
	}
}
