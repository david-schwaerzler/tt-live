package com.ttlive.exceptions;

public class BadRestRequestException extends Exception {

	private static final long serialVersionUID = 1L;

	public BadRestRequestException(String field, String what) {
		super("Bad Request on field '" + field + "': " + what);
	}

}
