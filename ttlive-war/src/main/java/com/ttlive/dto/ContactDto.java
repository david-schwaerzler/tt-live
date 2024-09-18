package com.ttlive.dto;

import com.ttlive.bo.Contact;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ContactDto {
	private long id;
	private String text;
	private String recipient;
	
	public static class ContactDtoBuilder {
		public ContactDtoBuilder bo(Contact bo) {
			this.id = bo.getId();
			this.text = bo.getText();
			this.recipient = bo.getRecipient();
			return this;
		}
	}
}
