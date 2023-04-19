package com.ttlive.hook;

import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.ejb.EJB;
import javax.ejb.Schedule;
import javax.ejb.Singleton;
import javax.enterprise.event.ObservesAsync;
import javax.websocket.CloseReason;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.ttlive.session.ChatMessageEvent;
import com.ttlive.session.GameUpdateEvent;
import com.ttlive.session.MatchEventObserver;
import com.ttlive.session.MatchUpdateEvent;

import lombok.extern.java.Log;

@Log
@ServerEndpoint("/hook/{matchId}")
@Singleton
public class TTLiveWebSocket {

	/** Timeout the session after one hour when no data has been send */
	private static final int SESSION_IDLE_TIMEOUT = 1 * 60 * 60 * 1000; 

	@EJB
	private MatchEventObserver socketManager;

	private ObjectMapper mapper;

	@PostConstruct
	private void onCreate() {
		mapper = new ObjectMapper();
		// Now you should use JavaTimeModule instead
		JavaTimeModule javaTimeModule = new JavaTimeModule();
		mapper.registerModule(javaTimeModule);
		mapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
		mapper.enable(SerializationFeature.INDENT_OUTPUT);
		// with this option null values don't appear in the final json
		// otherwise they exist like { test: null }
		mapper.setSerializationInclusion(Include.NON_NULL);
	}

	/*
	 * Contains the id of the matches as key and the list of connected websockets as
	 * values
	 */
	private HashMap<Long, List<Session>> sessions = new HashMap<Long, List<Session>>();

	@OnOpen
	public void onOpen(Session session, @PathParam("matchId") long matchId) {

		session.setMaxIdleTimeout(SESSION_IDLE_TIMEOUT);

		List<Session> sockets;

		synchronized (sessions) {
			sockets = sessions.get(matchId);
			if (sockets == null) {
				sockets = new LinkedList<>();
				sessions.put(matchId, sockets);
			}
		}

		synchronized (sockets) {
			if (sockets.contains(session) == false)
				sockets.add(session);
		}
	}

	@OnMessage
	public void onMessage(String message, Session session) {
	}

	@OnError
	public void onError(Session session, Throwable throwable) {
		log.warning("WebSocket error for " + session.getId() + " " + throwable.getMessage());
	}

	@OnClose
	public void onClose(Session session, CloseReason closeReason, @PathParam("matchId") long matchId) {

		List<Session> sockets = sessions.get(matchId);
		if (sockets == null)
			return;

		synchronized (sockets) {
			sockets.remove(session);
		}
	}

	public void emitUpdateGameEvent(@ObservesAsync GameUpdateEvent event) {
		try {
			UpdateActionDto actionDto = UpdateActionDto.builder().gameAction(event.getGame()).build();
			String json = mapper.writeValueAsString(actionDto);
			List<Session> sockets = sessions.get(event.getMatchId());
			if (sockets == null)
				return;

			synchronized (sockets) {
				for (Iterator<Session> iter = sockets.iterator(); iter.hasNext();) {
					try {
						Session socket = iter.next();
						if (socket.isOpen() == false)
							iter.remove();
						else
							socket.getAsyncRemote().sendObject(json);
					} catch (Exception e) {
						log.severe("Error sending message to socket. Socket will be removed");
						iter.remove();
					}
				}
			}
		} catch (Exception e) {
			log.severe(e.toString());
		}
	}

	public void emitUpdateMatchEvent(@ObservesAsync MatchUpdateEvent event) {
		try {
			UpdateActionDto actionDto = UpdateActionDto.builder().matchAction(event.getMatch()).build();
			String json = mapper.writeValueAsString(actionDto);
			List<Session> sockets = sessions.get(event.getMatchId());
			if (sockets == null)
				return;

			emitMessage(sockets, json);
		} catch (Exception e) {
			log.severe(e.toString());
		}
	}

	public void emitChatMessageEvent(@ObservesAsync ChatMessageEvent event) {
		try {
			UpdateActionDto actionDto = UpdateActionDto.builder().chatAction(event.getMessage()).build();
			String json = mapper.writeValueAsString(actionDto);
			List<Session> sockets = sessions.get(event.getMatchId());
			if (sockets == null)
				return;

			emitMessage(sockets, json);

		} catch (Exception e) {
			log.severe(e.toString());
		}
	}

	public void emitMessage(List<Session> sockets, String json) {

		synchronized (sockets) {

			for (Iterator<Session> socketIter = sockets.iterator(); socketIter.hasNext();) {
				Session socket = socketIter.next();
				try {
					if (socket.isOpen() == true) {
						socket.getAsyncRemote().sendObject(json);
					} else {
						socket.close();
						socketIter.remove();
					}
				} catch (Exception e) {
					try {
						socket.close();
					} catch (Exception e2) {
					}

					socketIter.remove();
				}
			}
		}
	}

	public long getUserCount(long matchId) {
		List<Session> users = sessions.get(matchId);
		if (users == null)
			return 0;
		return users.size();
	}

	@Schedule(hour = "*", minute = "*", second = "0")
	private void cleanupSockets() {
		try {
			for (List<Session> sockets : sessions.values()) {
				synchronized (sockets) {
					for (Iterator<Session> iter = sockets.iterator(); iter.hasNext();) {
						Session session = iter.next();
						if (session.isOpen() == false)
							iter.remove();
					}
				}
			}
			System.out.println(sessions.toString());
		} catch (Exception e) {
			log.severe("Error during socket cleanup. error='" + e.toString() + "'");
		}
	}
}
