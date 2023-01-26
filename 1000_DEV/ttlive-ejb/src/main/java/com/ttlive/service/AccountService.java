package com.ttlive.service;

import javax.ejb.EJB;
import javax.ejb.Stateless;

import com.ttlive.bo.Account;
import com.ttlive.bo.GameSet.InvalidGameSetFormat;
import com.ttlive.bo.LoginResponse;
import com.ttlive.bo.request.RequestAccount;
import com.ttlive.persistence.dao.AccountDao;
import com.ttlive.persistence.dao.MatchDao;
import com.ttlive.persistence.entity.AccountEntity;
import com.ttlive.persistence.entity.MatchEntity;
import com.ttlive.session.MatchEventObserver;
import com.ttlive.utils.BadRestRequestException;
import com.ttlive.utils.HashUtils;

@Stateless
public class AccountService {

	@EJB
	private AccountDao accountDao;

	@EJB
	private MatchService matchService;

	@EJB
	private MatchDao matchDao;
	
	@EJB
	private MatchEventObserver eventObserver;
	
	public Account findByName(String username) {
		AccountEntity entity = accountDao.findByName(username);
		if(entity == null)
			return null;
		return getDefault(entity);		
	}

	public LoginResponse login(String username, String password) {
		AccountEntity entity = accountDao.findByName(username);
		String hashedPassword = HashUtils.hash(password);

		LoginResponse.LoginResponseBuilder response = LoginResponse.builder();
		if (entity == null) {
			response.status(LoginStatus.USERNAME_INVALID);
		}
		// TODO implement Email authentification 
		//else if (entity.isAuthenticated() == false)
		//	return LoginStatus.NOT_AUTHENTICATED;
		else if (entity.getPassword().equals(hashedPassword) == false) {
			response.status(LoginStatus.PASSWORD_INVALID);
		} else {
			response.status(LoginStatus.SUCCESS);
			response.account(getDefault(entity));
		}
		return response.build();
	}

	public boolean isUsernameTaken(String username) {
		AccountEntity existing = accountDao.findByName(username);
		return existing != null;
	}

	public Account register(RequestAccount requestAccount) throws BadRestRequestException {

		String hashedPassword = HashUtils.hash(requestAccount.getPassword());

		if (isUsernameTaken(requestAccount.getUsername()))
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

	public Account connectMatch(String username, long matchId) throws BadRestRequestException, InvalidGameSetFormat {

		AccountEntity account = accountDao.findByName(username);
		if (account == null)
			throw new BadRestRequestException("username", "User with the name='" + username + "' doesn't exist");

		MatchEntity match = matchDao.findById(matchId);
		if (match == null)
			throw new BadRestRequestException("matchId", "Match with the id='" + matchId + "' doesn't exist");
		else if (match.getAccount() != null)
			throw new BadRestRequestException("matchId",
					"The match id='" + matchId + "' is already connected to an account");

		account.addMatch(match);
		
		eventObserver.fireMatchEvent(matchService.getDefault(match));

		return getDefault(account);
	}

	private Account getDefault(AccountEntity account) {
		return Account.builder() //
				.entity(account) //
				.matches(account.getMatches()) //
				.build();
	}

	public boolean isEditorCodeValid(long id, String editorCode) throws BadRestRequestException {
		return matchService.isEditorCodeValid(id, editorCode);
	}

	public static enum LoginStatus {
		USERNAME_INVALID, PASSWORD_INVALID, NOT_AUTHENTICATED, SUCCESS
	}
}
