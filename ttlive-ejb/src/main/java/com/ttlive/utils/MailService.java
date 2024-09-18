package com.ttlive.utils;

import javax.annotation.Resource;
import javax.mail.Address;
import javax.mail.Message;
import javax.mail.Multipart;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

public class MailService {
	
	@Resource(mappedName = "java:jboss/mail/Default")
	private Session mailSession;


	public void onCreate() {
		try {
		
		
		MimeMessage message = new MimeMessage(mailSession);
		Address from = new InternetAddress("tevid.tevid@gmail.com");
		Address[] to = new InternetAddress[1];
		to[0] = new InternetAddress("david@schwaerzler.info");
		
		message.setFrom(from);
		message.setRecipients(Message.RecipientType.TO, to);
		message.setSentDate(new java.util.Date());
		message.setSubject("Test Email");
		
		Multipart multipart = new MimeMultipart();
		MimeBodyPart textPart = new MimeBodyPart();
		
		textPart.setContent("Das ist ein toller test TExt ", "text/plain");
		
		multipart.addBodyPart(textPart);
		
		message.setContent(multipart);
		Transport.send(message);
		}catch(Exception e) {
			e.printStackTrace();
			
		}
	}

}
