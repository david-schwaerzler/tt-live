package com.ttlive.rest;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.Key;
import java.security.KeyStore;
import java.security.PrivateKey;

import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObjectBuilder;

import com.nimbusds.jose.JOSEObjectType;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.JWSObject;
import com.nimbusds.jose.JWSSigner;
import com.nimbusds.jose.Payload;
import com.nimbusds.jose.crypto.RSASSASigner;

import lombok.extern.java.Log;

@Log
public class JwtFactory {

	private static final String KEY_ALIAS = "jwt-priv-key";
	// TODO Store keys in database (settings table and create them with random
	// values when the keystore is created)
	private static final char[] SECRET_KEYSTORE = "d3mRR4LJ89oUvVufAT5j".toCharArray();

	private static final PrivateKey privateKey;
	private static final int TOKEN_VALIDITY = 4 * 60 * 60;
	private static final String ROLE = "user";
	private static final String ISSUER = "ttlive";
	private static final String AUDIENCE = "ttlive-web-app";

	static {
		FileInputStream fis = null;
		PrivateKey pk = null;

		try {
			Path keystorePath = Paths.get(System.getProperty("jboss.server.config.dir"), "jwt.jks");

			if (Files.exists(keystorePath) == false) {

				StringBuilder sb = new StringBuilder();

				sb.append("keytool -genkey -keyalg RSA") //
						.append(" -alias ").append(KEY_ALIAS) //
						.append(" -storepass ").append(SECRET_KEYSTORE).append("") //
						.append(" -dname CN=ttlive,OU=ttlive,O=ttlive,L=Hamburg,S=Hamburg,C=de") //
						.append(" -keystore ").append(keystorePath.toString()).append(""); //

				System.out.println(sb.toString());

				Process process = Runtime.getRuntime().exec(sb.toString());
				int exitCode = process.waitFor();
				if (exitCode != 0) {
					BufferedReader error = new BufferedReader(new InputStreamReader(process.getErrorStream()));
					log.severe("Error executing keytool code=:" + exitCode + " error: " + error.readLine());

				}

			}

			KeyStore ks = KeyStore.getInstance("JKS");
			fis = new FileInputStream(keystorePath.toString());
			ks.load(fis, SECRET_KEYSTORE);
			Key key = ks.getKey(KEY_ALIAS, SECRET_KEYSTORE);
			if (key instanceof PrivateKey) {
				pk = (PrivateKey) key;
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (fis != null) {
				try {
					fis.close();
				} catch (IOException e) {
				}
			}
		}
		privateKey = pk;
	}

	public String createUserJwt(final String subject) throws Exception {
		JWSSigner signer = new RSASSASigner(privateKey);
		JsonArrayBuilder rolesBuilder = Json.createArrayBuilder();
		rolesBuilder.add(ROLE);

		JsonObjectBuilder claimsBuilder = Json.createObjectBuilder() //
				.add("sub", subject).add("iss", ISSUER) //
				.add("aud", AUDIENCE) //
				.add("groups", rolesBuilder.build()) //
				.add("exp", ((System.currentTimeMillis() / 1000) + TOKEN_VALIDITY));

		JWSObject jwsObject = new JWSObject(
				new JWSHeader.Builder(JWSAlgorithm.RS256).type(new JOSEObjectType("jwt")).build(),
				new Payload(claimsBuilder.build().toString()));

		jwsObject.sign(signer);

		return jwsObject.serialize();
	}

}
