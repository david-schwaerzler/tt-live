package com.ttlive.pipeline;

import javax.annotation.PostConstruct;
import javax.batch.operations.JobOperator;
import javax.batch.operations.JobSecurityException;
import javax.batch.operations.NoSuchJobException;
import javax.batch.runtime.BatchRuntime;
import javax.batch.runtime.BatchStatus;
import javax.batch.runtime.JobExecution;
import javax.ejb.Lock;
import javax.ejb.LockType;
import javax.ejb.Schedule;
import javax.ejb.Singleton;
import javax.ejb.Startup;

import lombok.extern.java.Log;

@Log
@Singleton
@Startup
public class PipelineScheduler {

	private Long lastJobId = null;
	
	@Schedule(hour="0", minute="0", persistent = false)
	public void scheduledJob() {
			try {
				if(!BatchRuntime.getJobOperator().getRunningExecutions("pipeline-job").isEmpty()) {
					log.info("There is already a job in progress. Skipping pipeline-job execution.");
					return;
				}	
			} catch(NoSuchJobException e1) {
				// Ignore exception. The job has not been started the first time.
			} catch(JobSecurityException e2) {
				// Ignore exception. The job has not been started the first time.
			}
			// cleanup stopped jobs
			if(lastJobId != null) {
				JobOperator jobOperator = BatchRuntime.getJobOperator();
				JobExecution lastJob = jobOperator.getJobExecution(lastJobId);
				if(lastJob.getBatchStatus() == BatchStatus.STOPPED) {
					jobOperator.abandon(lastJobId);
				}					
			}

			log.info("Starting new pipeline-job.");
			lastJobId = BatchRuntime.getJobOperator().start("pipeline-job", null);		
	}
	
	@Lock(LockType.READ)
	@PostConstruct
	public void startupJob() {
		try {
			if(!BatchRuntime.getJobOperator().getRunningExecutions("pipeline-job").isEmpty()) {
				log.info("There is already a job in progress. Skipping pipeline-job execution.");
				return;
			}
		} catch(NoSuchJobException e1) {
			// Ignore exception. The job has not been started the first time.
		} catch(JobSecurityException e2) {
			// Ignore exception. The job has not been started the first time.
		}
		log.info("Starting new pipeline-job");
		lastJobId = BatchRuntime.getJobOperator().start("pipeline-job", null);
	}	
}