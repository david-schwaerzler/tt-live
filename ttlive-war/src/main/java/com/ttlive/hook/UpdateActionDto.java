package com.ttlive.hook;

import com.ttlive.bo.ChatMessage;
import com.ttlive.bo.Game;
import com.ttlive.bo.Match;
import com.ttlive.dto.ChatMessageDto;
import com.ttlive.dto.GameDto;
import com.ttlive.dto.MatchDto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class UpdateActionDto {

	private UpdateActions action;
	private GameDto game;
	private MatchDto match;
	private ChatMessageDto chat;

	public static enum UpdateActions {
		MATCH, GAME, CHAT;
	}

	public static class UpdateActionDtoBuilder {
		public UpdateActionDtoBuilder gameAction(Game game) {
			this.game = GameDto.builder().bo(game).build();
			this.action = UpdateActions.GAME;
			return this;
		}

		public UpdateActionDtoBuilder matchAction(Match match) {
			this.match = MatchDto.builder().bo(match).build();
			this.action = UpdateActions.MATCH;
			return this;
		}
		public UpdateActionDtoBuilder chatAction(ChatMessage chat) {
			this.action = UpdateActions.CHAT;
			this.chat = ChatMessageDto.builder().bo(chat).build();
			return this;
		}
	}
}