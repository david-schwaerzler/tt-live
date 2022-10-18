package com.ttlive.utils;

import java.util.HashSet;
import java.util.Random;

public class CodeFactory {

	private static final String[] CHARS = { "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o",
			"p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" };
	private static final int CODE_LENGTH = 6;
	private static final Random rnd = new Random();

	public static String createCode() {
		return createCode(CODE_LENGTH, new HashSet<String>());
	}

	public static String createCode(HashSet<String> existingCodes) {
		return createCode(CODE_LENGTH, existingCodes);
	}

	public static String createCode(int length, HashSet<String> existingCodes) {
		StringBuilder sb = null;
		do {
			sb = new StringBuilder();
			for (int i = 0; i < CODE_LENGTH; i++) {
				int idx = rnd.nextInt(CHARS.length);
				sb.append(CHARS[idx]);
			}			
		} while (existingCodes.contains(sb.toString()));
		return sb.toString();

	}

}
