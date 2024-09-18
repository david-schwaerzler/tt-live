package com.ttlive.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RequestGametSetDto {
	private int number;
	private int homeScore;
	private int guestScore;
}
