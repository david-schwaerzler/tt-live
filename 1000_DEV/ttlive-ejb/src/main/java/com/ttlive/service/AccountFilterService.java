package com.ttlive.service;

import java.util.LinkedList;
import java.util.List;

import javax.ejb.EJB;
import javax.ejb.Stateless;

import com.ttlive.bo.AccountFilter;
import com.ttlive.bo.request.RequestAccountFilter;
import com.ttlive.persistence.dao.AccountDao;
import com.ttlive.persistence.dao.AccountFilterDao;
import com.ttlive.persistence.entity.AccountEntity;
import com.ttlive.persistence.entity.AccountFilterEntity;
import com.ttlive.persistence.entity.AccountFilterSetEntity;
import com.ttlive.utils.BadRestRequestException;

@Stateless
public class AccountFilterService {

	@EJB
	private AccountDao accountDao;
	
	@EJB
	private AccountFilterDao filterDao;

	
	public AccountFilter create(String username, long filterSetId, RequestAccountFilter filter)
			throws BadRestRequestException {
		AccountEntity account = getAccount(username);

		AccountFilterSetEntity setEntity = null;
		for (AccountFilterSetEntity tmp : account.getFilterSets()) {
			if (tmp.getId() == filterSetId) {
				setEntity = tmp;
				break;
			}

		}
		if (setEntity == null)
			throw new BadRestRequestException("filterSetId",
					"The filterSet with the id='" + filterSetId + "' doesn't exist.");

		AccountFilterEntity filterEntity = new AccountFilterEntity();
		filterEntity.setType(filter.getType());
		filterEntity.setValue(filter.getValue());
		filterEntity.setFilterSet(setEntity);

		filterDao.persist(filterEntity);

		return getDefault(filterEntity);
	}

	public void delete(String username, long filterSetId, long filterId)
			throws BadRestRequestException {
		AccountEntity account = getAccount(username);

		AccountFilterSetEntity setEntity = null;
		for (AccountFilterSetEntity tmp : account.getFilterSets()) {
			if (tmp.getId() == filterSetId) {
				setEntity = tmp;
				break;
			}

		}
		if (setEntity == null)
			throw new BadRestRequestException("filterSetId",
					"The filterSet with the id='" + filterSetId + "' doesn't exist.");

		AccountFilterEntity filterEntity = null;
		for (AccountFilterEntity tmp : setEntity.getFilters()) {
			if (tmp.getId() == filterId) {
				filterEntity = tmp;
				break;
			}
		}

		if (filterEntity == null)
			throw new BadRestRequestException("filterId", "The filter with the id='" + filterSetId
					+ "' doesn't exist in the filterset id='" + filterSetId + "'");

		setEntity.removeFilter(filterEntity);

		return;
	}
	
	
	private AccountEntity getAccount(String username) throws BadRestRequestException {
		AccountEntity account = accountDao.findByName(username);
		if (account == null)
			throw new BadRestRequestException("username", "User with the name='" + username + "' doesn't exist");

		return account;

	}

	public AccountFilter getDefault(AccountFilterEntity filter) {
		return AccountFilter.builder() //
				.entity(filter) //
				.build();
	}

	public LinkedList<AccountFilter> getDefault(List<AccountFilterEntity> filters) {
		LinkedList<AccountFilter> ret = new LinkedList<>();
		for (AccountFilterEntity filter : filters) {
			ret.add(getDefault(filter));
		}
		return ret;
	}

}
