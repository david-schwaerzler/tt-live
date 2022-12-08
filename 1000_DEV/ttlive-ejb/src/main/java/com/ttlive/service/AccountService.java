package com.ttlive.service;

import javax.ejb.EJB;
import javax.ejb.Stateless;

import com.ttlive.persistence.dao.AccountDao;
import com.ttlive.persistence.entity.AccountEntity;

@Stateless
public class AccountService {

	@EJB
	private AccountDao accountDao;
	
	public LoginStatus login(String username, String password) {
		AccountEntity entity = accountDao.findByName(username);
		if(entity == null)
			return LoginStatus.USERNAME_INVALID;		
		else if(entity.isAuthenticated() == false)
			return LoginStatus.NOT_AUTHENTICATED;
		else if(entity.getPassword().equals(password))
			return LoginStatus.PASSWORD_INVALID;
		
		return LoginStatus.SUCCESS;
	}
	
	
	
	public static enum LoginStatus {
		USERNAME_INVALID,
		PASSWORD_INVALID,
		NOT_AUTHENTICATED,
		SUCCESS
	}
	
}
