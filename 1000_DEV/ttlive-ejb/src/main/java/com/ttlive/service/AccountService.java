package com.ttlive.service;

import javax.ejb.EJB;
import javax.ejb.Stateless;

import com.ttlive.bo.Account;
import com.ttlive.bo.request.RequestAccount;
import com.ttlive.persistence.dao.AccountDao;
import com.ttlive.persistence.entity.AccountEntity;
import com.ttlive.utils.BadRestRequestException;
import com.ttlive.utils.HashUtils;

@Stateless
public class AccountService {

	@EJB
	private AccountDao accountDao;

	public LoginStatus login(String username, String password) {
		AccountEntity entity = accountDao.findByName(username);
		if (entity == null)
			return LoginStatus.USERNAME_INVALID;
		else if (entity.isAuthenticated() == false)
			return LoginStatus.NOT_AUTHENTICATED;
		else if (entity.getPassword().equals(password))
			return LoginStatus.PASSWORD_INVALID;

		return LoginStatus.SUCCESS;
	}
	
	public boolean isUsernameTaken(String username) {
		AccountEntity existing = accountDao.findByName(username);
		return existing != null;
	}

	public Account register(RequestAccount requestAccount) throws BadRestRequestException {
		
		String hashedPassword = HashUtils.hash(requestAccount.getPassword());
		
		if(isUsernameTaken(requestAccount.getUsername()))
			throw new BadRestRequestException("username", "An account with the given usernam already exists");
		
		AccountEntity accountEntity = new AccountEntity();
		accountEntity.setUsername(requestAccount.getUsername());
		accountEntity.setEmail(requestAccount.getEmail());
		accountEntity.setPassword(hashedPassword);
		accountEntity.setAuthenticated(false);
		accountEntity.setRole("user");
		
		accountDao.persist(accountEntity);
		return getDefault(accountEntity);
	}
	
	private Account getDefault(AccountEntity account) {
		return Account.builder() //
				.entity(account) //
				.matches(account.getMatches()) //
				.build();
	}

	public static enum LoginStatus {
		USERNAME_INVALID, PASSWORD_INVALID, NOT_AUTHENTICATED, SUCCESS
	}
}
