package com.ttlive.persistence.entity;

import java.util.LinkedList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Data;
import lombok.ToString;

@Entity
@Table(name = "account_filter_set")
@Data
public class AccountFilterSetEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(name = "name")
	private String name;

	@Column(name = "is_active")
	private boolean isActive;

	@Column(name = "is_default")
	private boolean isDefault;
	
	@ToString.Exclude
	@ManyToOne
	@JoinColumn(name = "account_id")
	private AccountEntity account;

	@ToString.Exclude
	@OneToMany(mappedBy = "filterSet", cascade = { CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH,
			CascadeType.REMOVE}, orphanRemoval = true)
	private List<AccountFilterEntity> filters = new LinkedList<>();

	public void setAccount(AccountEntity account) {
		setAccount(account, true);
	}

	public void setAccount(AccountEntity account, boolean setBoth) {
		if (this.account != null && setBoth)
			this.account.removeFilterSet(this, false);
		this.account = account;

		if (setBoth && account != null)
			account.addFilterSet(this, false);
	}

	public void addFilter(AccountFilterEntity filter) {
		addFilter(filter, true);
	}

	public void addFilter(AccountFilterEntity filter, boolean setBoth) {
		if (!filters.contains(filter))
			filters.add(filter);
		if (setBoth)
			filter.setFilterSet(this, false);
	}

	public void removeFilter(AccountFilterEntity filter) {
		removeFilter(filter, true);
	}

	public void removeFilter(AccountFilterEntity filter, boolean setBoth) {
		filters.remove(filter);
		if (setBoth)
			filter.setFilterSet(null, false);
	}
}
