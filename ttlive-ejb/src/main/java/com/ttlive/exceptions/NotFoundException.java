package com.ttlive.exceptions;

public class NotFoundException extends Exception{

	private static final long serialVersionUID = -7423673149559591210L;

	public NotFoundException(String objectName) {
		super("Element not found '" + objectName);		
	}
	public NotFoundException(String objectName, String what) {
		super("Element not found '" + objectName+ "': " + what);
	}
	
}
