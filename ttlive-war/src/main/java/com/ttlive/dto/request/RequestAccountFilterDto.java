package com.ttlive.dto.request;

import com.ttlive.utils.AccountFilterType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RequestAccountFilterDto {
	private AccountFilterType type;
	private String value;
}
