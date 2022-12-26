package com.ttlive.bo.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RequestAccount {
	private String username;
	private String password;
	private String email; 
}
