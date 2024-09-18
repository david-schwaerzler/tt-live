package com.ttlive.rest;

public class InvalidRequestDataException extends Exception{

	private static final long serialVersionUID = 1L;
	
	public InvalidRequestDataException(String field, String what) {
		super("Invalid Request Field: " + field + ", error=" + what);
	}
	
	public InvalidRequestDataException(String what) {
		super(what);		
	}
}
