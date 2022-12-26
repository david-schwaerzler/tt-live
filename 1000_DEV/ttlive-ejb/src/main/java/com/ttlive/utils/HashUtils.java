package com.ttlive.utils;

import org.apache.commons.codec.digest.DigestUtils;

public class HashUtils {

	private static final String PEPPER = "tt";
	private static final String SALT = "live";
	
	/**
	 * Hashes the given string using a salt an pepper
	 * @param src string that should be hashed
	 * @return the hashed string in hex
	 */
	public static String hash(String src) {
		return DigestUtils.sha256Hex(SALT + src + PEPPER);
	}
	
	/**
	 * Checks if the given value equals the hash
	 * @param hash that is used for validation
	 * @param value hat will be hashed and checked for equality
	 * @return whether the given has equals the hashed value
	 */
	public static boolean equals(String hash, String value) {
		String hash2 = DigestUtils.sha256Hex(value);
		return hash2.equals(hash);
	}
}
