package com.ttlive.pipeline;

import javax.batch.api.Batchlet;
import javax.batch.runtime.BatchStatus;
import javax.ejb.EJB;
import javax.enterprise.context.Dependent;
import javax.inject.Named;

@Dependent
@Named("TTMaximusBatchlet")

public class TTMaximusBatchlet implements Batchlet {

	@EJB
	private TTMaximusService service;
	
	@Override
	public String process() throws Exception {
		service.updateLeagues();
		return BatchStatus.COMPLETED.toString();
	}

	

	@Override
	public void stop() throws Exception {
	}

}
