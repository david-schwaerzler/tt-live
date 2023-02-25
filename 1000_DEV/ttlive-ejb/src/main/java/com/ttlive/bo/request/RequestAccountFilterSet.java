package com.ttlive.bo.request;

import java.util.List;

import com.ttlive.bo.AccountFilter;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RequestAccountFilterSet {
	private String name;
	private boolean isActive;
	private boolean isDefault;	
}
