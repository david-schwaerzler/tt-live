package com.ttlive.service;

import java.util.LinkedList;
import java.util.List;

import javax.ejb.EJB;
import javax.ejb.Stateless;

import com.ttlive.bo.AccountFilterSet;
import com.ttlive.bo.request.RequestAccountFilterSet;
import com.ttlive.exceptions.BadRestRequestException;
import com.ttlive.persistence.dao.AccountDao;
import com.ttlive.persistence.dao.AccountFilterDao;
import com.ttlive.persistence.dao.AccountFilterSetDao;
import com.ttlive.persistence.entity.AccountEntity;
import com.ttlive.persistence.entity.AccountFilterSetEntity;

@Stateless
public class AccountFilterSetService {

	@EJB
	private AccountDao accountDao;

	@EJB
	private AccountFilterSetDao filterSetDao;

	@EJB
	private AccountFilterDao filterDao;

	public LinkedList<AccountFilterSet> getFilterSet(String username) throws BadRestRequestException {
		AccountEntity account = getAccount(username);
		return getDefault(account.getFilterSets());
	}	

	public AccountFilterSet createFilterSet(String username, RequestAccountFilterSet requestSet)
			throws BadRestRequestException {

		AccountEntity account = getAccount(username);

		for (AccountFilterSetEntity setEntity : account.getFilterSets()) {
			if (setEntity.getName().equals(requestSet.getName()))
				throw new BadRestRequestException("name",
						"AccountFilterSet with the name='" + requestSet.getName() + "' does already exist");
		}

		AccountFilterSetEntity entity = new AccountFilterSetEntity();
		entity.setName(requestSet.getName());
		entity.setActive(requestSet.isActive());

		// if the new created filterSet is the default, all other are not default
		if (requestSet.isDefault())
			account.getFilterSets().forEach(afs -> afs.setDefault(false));
		entity.setDefault(requestSet.isDefault());
		entity.setAccount(account);

		filterSetDao.persist(entity);
		return getDefault(entity);
	}

	public AccountFilterSet updateFilterSet(String username, long filterSetId, RequestAccountFilterSet requestSet)
			throws BadRestRequestException {

		AccountEntity account = getAccount(username);

		AccountFilterSetEntity entity = null;
		for (AccountFilterSetEntity tmp : account.getFilterSets()) {
			if (tmp.getId() == filterSetId)
				entity = tmp;
			else if (tmp.getName().equals(requestSet.getName()))
				throw new BadRestRequestException("name",
						"AccountFilterSet with the name='" + requestSet.getName() + "' does already exist");
		}
		
		if(entity == null) {
			throw new BadRestRequestException("name",
					"AccountFilterSet with the id='" + filterSetId + "' doesn't exist");
		}

		entity.setName(requestSet.getName());
		entity.setActive(requestSet.isActive());

		// if the new created filterSet is the default, all other are not default
		if (requestSet.isDefault())
			account.getFilterSets().forEach(afs -> afs.setDefault(false));
		entity.setDefault(requestSet.isDefault());
		entity.setAccount(account);

		return getDefault(entity);
	}
	
	public void removeFilterSet(String username, long filterSetId)
			throws BadRestRequestException {

		AccountEntity account = getAccount(username);

		AccountFilterSetEntity entity = null;
		for (AccountFilterSetEntity tmp : account.getFilterSets()) {
			if (tmp.getId() == filterSetId)
				entity = tmp;			
		}
		
		if(entity == null) {
			throw new BadRestRequestException("name",
					"AccountFilterSet with the id='" + filterSetId + "' doesn't exist");
		}
		account.removeFilterSet(entity);
	}

	private AccountEntity getAccount(String username) throws BadRestRequestException {
		AccountEntity account = accountDao.findByName(username);
		if (account == null)
			throw new BadRestRequestException("username", "User with the name='" + username + "' doesn't exist");

		return account;

	}

	public AccountFilterSet getDefault(AccountFilterSetEntity filterSet) {
		return AccountFilterSet.builder() //
				.entity(filterSet) //
				.filterEntities(filterSet.getFilters()) //
				.build();
	}

	public LinkedList<AccountFilterSet> getDefault(List<AccountFilterSetEntity> filterSets) {
		LinkedList<AccountFilterSet> ret = new LinkedList<>();
		for (AccountFilterSetEntity set : filterSets) {
			ret.add(getDefault(set));
		}
		return ret;
	}

}
