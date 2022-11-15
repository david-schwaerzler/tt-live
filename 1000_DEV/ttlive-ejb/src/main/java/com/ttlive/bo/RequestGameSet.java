package com.ttlive.bo;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RequestGameSet {
	private int number;
	private int homeScore;
	private int guestScore;
}
