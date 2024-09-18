package com.ttlive.persistence.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.ttlive.utils.AccountFilterType;

import lombok.Data;
import lombok.ToString;

@Entity
@Data
@Table(name = "account_filter")
public class AccountFilterEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(name = "type")
	@Enumerated(EnumType.STRING)
	private AccountFilterType type;

	@Column(name = "value")
	private String value;

	@ToString.Exclude
	@ManyToOne
	@JoinColumn(name = "set_id", referencedColumnName = "id")
	private AccountFilterSetEntity filterSet;

	public void setFilterSet(AccountFilterSetEntity filterSet) {
		setFilterSet(filterSet, true);
	}

	public void setFilterSet(AccountFilterSetEntity filterSet, boolean setBoth) {
		if (this.filterSet != null && setBoth)
			this.filterSet.removeFilter(this, false);
		this.filterSet = filterSet;

		if (setBoth && filterSet != null)
			filterSet.addFilter(this, false);
	}
}
