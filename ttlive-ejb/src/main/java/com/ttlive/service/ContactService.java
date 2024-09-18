package com.ttlive.service;

import javax.ejb.EJB;
import javax.ejb.Stateless;

import com.ttlive.bo.Contact;
import com.ttlive.bo.request.RequestContact;
import com.ttlive.exceptions.BadRestRequestException;
import com.ttlive.persistence.dao.ContactDao;
import com.ttlive.persistence.entity.ContactEntity;

@Stateless
public class ContactService {

	@EJB
	private ContactDao contactDao;

	public Contact create(RequestContact requestContact) throws BadRestRequestException {
		checkSizes(requestContact.getText(), requestContact.getRecipient());

		ContactEntity entity = new ContactEntity();
		entity.setText(requestContact.getText());
		if (requestContact.getRecipient() != null && requestContact.getRecipient().equals("") == false)
			entity.setRecipient(requestContact.getRecipient());

		contactDao.persist(entity);

		return getDefault(entity);
	}

	private Contact getDefault(ContactEntity entity) {
		return Contact.builder() //
				.id(entity.getId()) //
				.text(entity.getText()).recipient(entity.getRecipient()) //
				.build();
	}

	private void checkSizes(String text, String recipient) throws BadRestRequestException {
		if (text != null && text.length() >= 4096)
			throw new BadRestRequestException("text", "Text must be shorter than " + 4096 + " characters.");

		if (recipient != null && recipient.length() >= 256)
			throw new BadRestRequestException("recipient", "Recipient must be shorter than " + 256 + " characters.");
	}
}
