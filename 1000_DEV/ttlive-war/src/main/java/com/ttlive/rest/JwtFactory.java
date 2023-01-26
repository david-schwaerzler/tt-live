package com.ttlive.rest;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.Key;
import java.security.KeyStore;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.cert.Certificate;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.ejb.Singleton;
import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObjectBuilder;

import com.nimbusds.jose.JOSEObjectType;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.JWSObject;
import com.nimbusds.jose.JWSSigner;
import com.nimbusds.jose.JWSVerifier;
import com.nimbusds.jose.Payload;
import com.nimbusds.jose.crypto.RSASSASigner;
import com.nimbusds.jose.crypto.factories.DefaultJWSVerifierFactory;
import com.ttlive.bo.Account;

import lombok.extern.java.Log;

@Log
@Singleton
public class JwtFactory {

	public static final long AUTH_TOKEN_VALIDITY = 30 * 60; // valid for 30 minutes
	public static final long REFRESH_TOKEN_VALIDITY = 8 * 60 * 60; // valid for 8 hours

	private static final String KEY_ALIAS = "jwt-priv-key";
	private static final char[] SECRET_KEYSTORE = "d3mRR4LJ89oUvVufAT5j".toCharArray();
	private static final String ISSUER = "ttlive";
	private static final String AUDIENCE = "ttlive-web-app";
	private static final Path keystorePath = Paths.get(System.getProperty("jboss.server.config.dir"), "jwt.jks");
	private static final String keyStoreCmd = new StringBuilder().append("keytool -genkey -keyalg RSA") //
			.append(" -alias ").append(KEY_ALIAS) //
			.append(" -storepass ").append(SECRET_KEYSTORE).append("") //
			.append(" -dname CN=ttlive,OU=ttlive,O=ttlive,L=Hamburg,S=Hamburg,C=de") //
			.append(" -keystore ").append(keystorePath.toString()).append("").toString(); //

	private PrivateKey privateKey;
	private PublicKey publicKey;

	@PostConstruct
	public void onCreate() {
		FileInputStream fis = null;
		PrivateKey privateKey = null;
		PublicKey publicKey = null;

		try {
			Path keystorePath = Paths.get(System.getProperty("jboss.server.config.dir"), "jwt.jks");

			if (Files.exists(keystorePath) == false) {
				throw new FileNotFoundException(
						"Keystore file doesn't exist. Use this Command to create it: " + keyStoreCmd);
			}

			KeyStore ks = KeyStore.getInstance("JKS");
			fis = new FileInputStream(keystorePath.toString());
			ks.load(fis, SECRET_KEYSTORE);
			Key key = ks.getKey(KEY_ALIAS, SECRET_KEYSTORE);
			if (key instanceof PrivateKey) {
				privateKey = (PrivateKey) key;

				Certificate cert = ks.getCertificate(KEY_ALIAS);
				publicKey = cert.getPublicKey();
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
		this.privateKey = privateKey;
		this.publicKey = publicKey;
	}

	public String createAuthJwt(Account account) throws Exception {
		return createJwt(account, false, AUTH_TOKEN_VALIDITY);
	}

	public String createRefreshJwt(Account account) throws Exception {
		return createJwt(account, true, REFRESH_TOKEN_VALIDITY);
	}

	private String createJwt(Account account, boolean isRefreshToken, long tokenValidity) throws Exception {

		if (privateKey == null) {
			throw new FileNotFoundException(
					"Keystore file doesn't exist. Use this Command to create it: " + keyStoreCmd);
		}

		JWSSigner signer = new RSASSASigner(privateKey);
		JsonArrayBuilder rolesBuilder = Json.createArrayBuilder();

		rolesBuilder.add(account.getRole());

		JsonObjectBuilder claimsBuilder = Json.createObjectBuilder() //
				.add("sub", account.getUsername()) //
				.add("iss", ISSUER) //
				.add("aud", AUDIENCE) //
				.add("groups", rolesBuilder.build()) //
				.add("exp", ((System.currentTimeMillis() / 1000) + tokenValidity)) //
				.add("isRefresh", isRefreshToken);

		JWSObject jwsObject = new JWSObject(
				new JWSHeader.Builder(JWSAlgorithm.RS256).type(new JOSEObjectType("jwt")).build(),
				new Payload(claimsBuilder.build().toString()));

		jwsObject.sign(signer);

		return jwsObject.serialize();
	}

	public boolean validateToken(String token, boolean isRefresh) {
		try {

			if (publicKey == null) {
				throw new FileNotFoundException(
						"Keystore file doesn't exist. Use this Command to create it: " + keyStoreCmd);
			}

			JWSObject obj = JWSObject.parse(token);
			JWSVerifier verifier = new DefaultJWSVerifierFactory().createJWSVerifier(obj.getHeader(), publicKey);

			if (obj.verify(verifier) == false)
				return false;

			Map<String, Object> attributes = obj.getPayload().toJSONObject();
			Object refresh = attributes.get("isRefresh");

			if ((refresh instanceof Boolean) == false)
				return false;
			if ((boolean) refresh != isRefresh)
				return false;

			Object exp = attributes.get("exp");
			if ((exp instanceof Long) == false)
				return false;
			if ((long) exp < System.currentTimeMillis() / 1000)
				return false;

			return true;

		} catch (Exception e) {
			log.severe(
					"Error parsing JWT token while validating. False will be returned. error='" + e.toString() + "'");
			return false;
		}
	}

}
