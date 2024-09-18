package com.ttlive.bo.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RequestContact {
	public String text;
	private String recipient;
}
