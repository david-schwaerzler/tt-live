package com.ttlive.action_log;

public enum ActionLogState {
	/**
	 * Start state of an action
	 */
	START,  
	
	/**
	 * End log of an action
	 */
	FINISHED,
	
	/**
	 * Used to log a warning at an action
	 */
	WARNING, 
	
	/**
	 * Used to log an Severe Error and the action is abort
	 */
	ABORT,
	
	/**
	 * Used to log an Error that is not severe and the action is continues
	 */
	ERROR, 
	
	/**
	 * Used to log current information for the current action
	 */
	INFO
}
