package com.ttlive.pipeline;

import javax.batch.api.Batchlet;
import javax.batch.runtime.BatchStatus;
import javax.ejb.EJB;
import javax.enterprise.context.Dependent;
import javax.inject.Named;

@Dependent
@Named("ClickttBatchlet")
public class ClickttBatchlet implements Batchlet {

	@EJB
	private ClickttService clickttService;

	@Override
	public String process() throws Exception {
		clickttService.updateTeams();
		return BatchStatus.COMPLETED.toString();
	}	

	@Override
	public void stop() throws Exception {
	}

}
