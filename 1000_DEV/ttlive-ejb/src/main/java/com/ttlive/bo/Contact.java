package com.ttlive.bo;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Contact {
	private long id;
	private String text;
	private String recipient;
}
