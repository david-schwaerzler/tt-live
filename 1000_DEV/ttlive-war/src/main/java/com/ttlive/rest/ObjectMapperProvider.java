package com.ttlive.rest;

import javax.ws.rs.ext.ContextResolver;
import javax.ws.rs.ext.Provider;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

@Provider
public class ObjectMapperProvider implements ContextResolver<ObjectMapper>{
	

	private final ObjectMapper MAPPER;

	public ObjectMapperProvider() {
		MAPPER = new ObjectMapper();
		// Now you should use JavaTimeModule instead
		JavaTimeModule javaTimeModule = new JavaTimeModule();
		MAPPER.registerModule(javaTimeModule);
		MAPPER.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
		MAPPER.enable(SerializationFeature.INDENT_OUTPUT);
		// with this option null values don't appear in the final json
		// otherwise they exist like { test: null }
		MAPPER.setSerializationInclusion(Include.NON_NULL);
	}

	@Override
	public ObjectMapper getContext(Class<?> type) {
		return MAPPER;
	}

}
