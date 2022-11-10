package com.ttlive.rest;

public class InvalidEditorCodeException extends Exception {
	private static final long serialVersionUID = 1L;

	public InvalidEditorCodeException(String editorCode, long matchId) {
		super("The editorCode '" + editorCode + "' is invalid for the match with id: " + matchId);
	}

}
