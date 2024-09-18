package com.ttlive.persistence.dao;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.TypedQuery;

import com.ttlive.persistence.entity.ChatMessageEntity;
import com.ttlive.utils.BaseDao;

@Stateless
public class ChatMessageDao extends BaseDao<ChatMessageEntity>{

	public ChatMessageDao() {
		super(ChatMessageEntity.class);
	}
	
	public List<ChatMessageEntity> findByMatch(long matchId) {
		TypedQuery<ChatMessageEntity> query = em.createNamedQuery("Chat.findByMatch", ChatMessageEntity.class);
		query.setParameter("id", matchId);
		return query.getResultList();
	}
}
