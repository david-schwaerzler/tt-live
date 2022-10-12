package com.ttlive.pipeline;

import java.io.IOException;
import java.net.MalformedURLException;
import java.util.LinkedList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.ejb.EJB;
import javax.ejb.Stateless;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import com.ttlive.action_log.ActionLogService;
import com.ttlive.persistence.dao.LeagueDao;
import com.ttlive.persistence.entity.LeagueEntity;
import com.ttlive.utils.LeagueContest;

import lombok.extern.java.Log;

@Stateless
@Log
public class TTMaximusService {

	private static final String LOGGER_CAPTION = TTMaximusBatchlet.class.getSimpleName();
	private static final String EMPTY_LEAGUE_TEXT = "(nicht besetzt)";
	private static final String REGION_REGEX = "^.*clicktt\\/(.*?)\\/.*$";
	private static final String WOMEN_URL = "https://www.tt-maximus.de/pdpages/ttmaximus/click-tt-damen.php";
	private static final String MEN_URL = "https://www.tt-maximus.de/pdpages/ttmaximus/click-tt-herren.php";
	
	@EJB
	private LeagueDao leagueDao;

	@EJB
	private ActionLogService actionLog;
	
	public void updateLeagues() throws Exception {
		actionLog.logStart(LOGGER_CAPTION, "");

		try {
			LinkedList<LeagueEntity> newData = loadLeagues(WOMEN_URL, LeagueContest.WOMEN);
			updateEntities(newData);

			newData = loadLeagues(MEN_URL, LeagueContest.MEN);
			updateEntities(newData);
		} catch (Exception e) {
			actionLog.logAbort(LOGGER_CAPTION, e.toString());
			throw e;
		}

		actionLog.logFinished(LOGGER_CAPTION, "");
	}
	
	private LinkedList<LeagueEntity> loadLeagues(String url, LeagueContest contest)
			throws MalformedURLException, IOException {

		Connection connect = Jsoup.connect(url);
		Document doc = connect.get();

		Elements rows = doc.select(".mainTable tbody tr");

		LinkedList<LeagueEntity> leagueEntities = new LinkedList<LeagueEntity>();

		for (Element row : rows) {
			if (row.select("th").isEmpty() == false) {
				continue; // ignore table header
			}

			Elements columns = row.select("td");

			String name = columns.get(0).text();

			// ignore leagues that are not used and have no teams
			if (name.contains(EMPTY_LEAGUE_TEXT))
				continue;

			String link = columns.get(1).select("a").attr("href");
			if (link != null && link.equals(""))
				link = null;

			String region = null;
			Pattern pattern = Pattern.compile(REGION_REGEX);
			if (link != null) {
				Matcher matcher = pattern.matcher(link);
				if (matcher.matches()) {
					region = matcher.group(1);
				}
			}

			LeagueEntity entity = new LeagueEntity();
			entity.setName(name);
			entity.setLink(link);
			entity.setRegion(region);
			entity.setContest(contest);

			log.info("Loaded League: " + leagueEntities.toString());

			leagueEntities.add(entity);
		}
		return leagueEntities;
	}

	private void updateEntities(List<LeagueEntity> newLeagues) {
		List<LeagueEntity> existingLeagues = leagueDao.findAll();

		for (LeagueEntity newLeague : newLeagues) {
			boolean exists = false;

			// check if the league exists. If thats the case update it's values
			for (LeagueEntity existingLeague : existingLeagues) {
				if (existingLeague.getName().equals(newLeague.getName())
						&& existingLeague.getContest().equals(newLeague.getContest())) {

					existingLeague.setName(newLeague.getName());
					existingLeague.setContest(newLeague.getContest());
					existingLeague.setLink(newLeague.getLink());
					existingLeague.setRegion(newLeague.getRegion());
					exists = true;
					break;
				}
			}

			// if the league doesn't exists already, persist it
			if (exists == false) {
				leagueDao.persist(newLeague);
			}
		}

	}
}
