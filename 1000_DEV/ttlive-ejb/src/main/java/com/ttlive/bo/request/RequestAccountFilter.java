package com.ttlive.bo.request;

import com.ttlive.utils.AccountFilterType;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RequestAccountFilter {
	private AccountFilterType type;
	private String value;
}
