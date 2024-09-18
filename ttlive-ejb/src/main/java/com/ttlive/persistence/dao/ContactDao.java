package com.ttlive.persistence.dao;

import javax.ejb.Stateless;

import com.ttlive.persistence.entity.ContactEntity;
import com.ttlive.utils.BaseDao;

@Stateless
public class ContactDao extends BaseDao<ContactEntity>{

	public ContactDao() {
		super(ContactEntity.class);
	}

	
}
