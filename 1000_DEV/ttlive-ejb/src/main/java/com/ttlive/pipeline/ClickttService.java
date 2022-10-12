package com.ttlive.pipeline;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.LinkedList;
import java.util.List;

import javax.ejb.EJB;
import javax.ejb.Stateless;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import com.ttlive.action_log.ActionLogService;
import com.ttlive.persistence.dao.LeagueDao;
import com.ttlive.persistence.dao.MatchDao;
import com.ttlive.persistence.dao.TeamDao;
import com.ttlive.persistence.entity.LeagueEntity;
import com.ttlive.persistence.entity.MatchEntity;
import com.ttlive.persistence.entity.TeamEntity;

import lombok.extern.java.Log;

@Stateless
@Log
public class ClickttService {
	private static final String LOGGER_CAPTION = ClickttBatchlet.class.getSimpleName();
	private static final String[] TEAM_NUMBERS = { "I", "II", "III", "IV", "V", "VI", "VII", //
			"VIII", "IX", "X", "XI", "XII", "XIII" };
	static final DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("dd.MM.yy");
	static final DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm");

	@EJB
	private TeamDao teamDao;

	@EJB
	private LeagueDao leagueDao;

	@EJB
	private MatchDao matchDao;

	@EJB
	private ActionLogService logger;

	public void updateTeams() throws Exception {

		logger.logStart(LOGGER_CAPTION, "");

		List<LeagueEntity> leagues = leagueDao.findAll();

		for (LeagueEntity league : leagues) {
			try {
				if (league.getLink() == null || league.getLink().equals("") == true) {
					continue;
				}
				Connection connect = Jsoup.connect(league.getLink());
				Document doc = connect.get();
				LinkedList<TeamEntity> teams = loadTeams(league, doc);
				updateTeamEntities(teams, league);

				LinkedList<MatchEntity> matches = loadMatches(league, doc);
				updateMatchEntities(matches);

			} catch (Exception e) {
				logger.logAbort(LOGGER_CAPTION, "error parsing League: " + league.getName() + " - "
						+ league.getContest().toString() + " : " + e.toString());
				throw e;
			}
		}
		logger.logFinished(LOGGER_CAPTION, "");

	}

	private LinkedList<TeamEntity> loadTeams(LeagueEntity league, Document doc) throws Exception {

		LinkedList<TeamEntity> teams = new LinkedList<TeamEntity>();

		Elements tables = doc.select(".panel-body table");
		if (tables.size() == 0) {
			throw new TeamParseException(
					"Couldn' parse Team table for league=" + league.getName() + " " + league.getContest().toString());
		}

		Element teamTable = tables.get(0);
		Elements rows = teamTable.select("tbody tr");

		for (Element row : rows) {
			Elements cells = row.select("td");

			String fullName = cells.get(2).select("a").text();

			int victories = 0;
			int ties = 0;
			int losses = 0;
			boolean retreated = false;
			if (cells.get(3).text().contains("zurückgezogen")) {
				retreated = true;
			} else {
				victories = Integer.parseInt(cells.get(4).text());
				ties = Integer.parseInt(cells.get(5).text());
				losses = Integer.parseInt(cells.get(6).text());
			}

			int teamNumber = parseNumber(fullName);
			String club = parseClub(fullName);

			String link = cells.get(2).select("a").attr("href");
			if (link != null && link.equals(""))
				link = null;

			TeamEntity team = new TeamEntity();
			team.setFullName(fullName);
			team.setVictories(victories);
			team.setTies(ties);
			team.setLosses(losses);
			team.setRetreated(retreated);
			team.setNumber(teamNumber);
			team.setClub(club);
			team.setLink(link);
			team.setClicktt(true);
			team.setLastFetched(LocalDateTime.now());

			teams.add(team);
			log.info("Team loaded: " + team.toString());

		}
		return teams;
	}

	private void updateTeamEntities(LinkedList<TeamEntity> teams, LeagueEntity league) {

		List<TeamEntity> existingTeams = teamDao.findAll();

		for (TeamEntity newTeam : teams) {
			boolean exists = false;

			for (TeamEntity existingTeam : existingTeams) {
				if (existingTeam.getFullName().equals(newTeam.getFullName())
						&& existingTeam.getLeague().getContest().equals(league.getContest())) {

					existingTeam.setFullName(newTeam.getFullName());
					existingTeam.setVictories(newTeam.getVictories());
					existingTeam.setTies(newTeam.getTies());
					existingTeam.setLosses(newTeam.getLosses());
					existingTeam.setNumber(newTeam.getNumber());
					existingTeam.setClub(newTeam.getClub());
					existingTeam.setLink(newTeam.getLink());
					existingTeam.setClicktt(newTeam.isClicktt());
					existingTeam.setLastFetched(newTeam.getLastFetched());
					existingTeam.setLeague(league);
					exists = true;
					break;
				}
			}
			if (exists == false) {
				newTeam.setLeague(league);
				teamDao.persist(newTeam);
			}
		}

	}

	private int parseNumber(String fullName) {

		String[] parts = fullName.split(" ");
		if (parts.length == 0) // no number exists therefore first team
			return 1;

		String number = parts[parts.length - 1];

		for (int i = 0; i < TEAM_NUMBERS.length; i++) {
			if (number.equals(TEAM_NUMBERS[i])) {
				return i + 1;
			}
		}
		return 1;
	}

	private String parseClub(String fullName) {
		String[] parts = fullName.split(" ");
		if (parts.length == 0) // no number exists therefore first team
			return fullName;

		String number = parts[parts.length - 1];

		for (int i = 0; i < TEAM_NUMBERS.length; i++) {
			if (number.equals(TEAM_NUMBERS[i])) {
				String clubName = "";
				for (int j = 0; j < parts.length - 1; j++) {
					clubName += clubName.equals("") ? parts[j] : " " + parts[j];
				}
				return clubName;
			}
		}
		return fullName;
	}

	private LinkedList<MatchEntity> loadMatches(LeagueEntity league, Document doc) throws MatchParsException {

		LinkedList<MatchEntity> matches = new LinkedList<MatchEntity>();

		Elements table = doc.select("#playingPlanDesktop");
		Elements rows = table.select("tbody tr");
		
		LocalDateTime lastDate = null;

		for (Element row : rows) {

			String date = row.select("td").get(0).text();
			String time = row.select("td").get(1).text();
			String homeTeam = row.select("td").get(3).text();
			String guestTeam = row.select("td").get(4).text();
			String score = row.select("td").get(7).select("a").text();

			LocalDateTime dateTime = lastDate;
			if(date.equals("")) {
				if(lastDate == null)
					throw new MatchParsException("Match couldn't be parsed. No previous date exits.");					
			}else {
				dateTime = parseDateTime(date, time);
				lastDate = dateTime;
			}

			TeamEntity homeTeamEntity = teamDao.findByFullName(homeTeam, league.getContest());
			if (homeTeamEntity == null)
				throw new MatchParsException("HomeTeam with name '" + homeTeam + " doesn't exist"); 

			TeamEntity guestTeamEntity = teamDao.findByFullName(guestTeam, league.getContest());
			if (guestTeamEntity == null)
				throw new MatchParsException("HomeTeam with name '" + guestTeam + " doesn't exist");

			Integer homeScore = null;
			Integer guestScore = null;
			boolean finished = false;
			if (score.isEmpty() == false) {
				score = score.split(" ")[0]; 
				String[] scoreParts = score.split(":");
				if (scoreParts.length != 2)
					throw new MatchParsException("The score of match '" + homeTeam + " - " + guestTeam
							+ " is in the wrong format: " + score);
				
				homeScore = Integer.parseInt(scoreParts[0]);
				guestScore = Integer.parseInt(scoreParts[1]);
				finished = true;
			}

			MatchEntity match = new MatchEntity();
			match.setHomeTeamScore(homeScore);
			match.setGuestTeamScore(guestScore);
			match.setFinished(finished);
			match.setDate(dateTime);
			match.setHomeTeam(homeTeamEntity);
			match.setGuestTeam(guestTeamEntity);

			matches.add(match);

		}
		return matches;
	}

	private void updateMatchEntities(LinkedList<MatchEntity> matches) {

		List<MatchEntity> existingMatches = matchDao.findAll();
		for (MatchEntity newMatch : matches) {

			boolean exists = false;
			for (MatchEntity existingMatch : existingMatches) {
				if (newMatch.getHomeTeam().getFullName().equals(existingMatch.getHomeTeam().getFullName())
						&& newMatch.getGuestTeam().getFullName().equals(existingMatch.getGuestTeam().getFullName())) {

					existingMatch.setHomeTeamScore(newMatch.getHomeTeamScore());
					existingMatch.setGuestTeamScore(newMatch.getGuestTeamScore());
					existingMatch.setDate(newMatch.getDate());
					existingMatch.setHomeTeam(newMatch.getHomeTeam());
					existingMatch.setGuestTeam(newMatch.getGuestTeam());
					exists = true;
					break;
				}
			}
			if (exists == false) {
				matchDao.persist(newMatch);
			}			
		}
	}

	private LocalDateTime parseDateTime(String date, String time) throws MatchParsException {

		String[] dateParts = date.split(" ");
		if (dateParts.length != 2)
			throw new MatchParsException("Date for match is in the wrong format: " + date);

		date = dateParts[dateParts.length - 1];
		
		String[] timeParts = time.split(" ");
		if(timeParts.length == 0)
			throw new MatchParsException("Time is in the wrong formage: " + time);
		
		time = timeParts[0];

		LocalDate localDate = LocalDate.parse(date, dateFormatter);
		LocalTime localTime = LocalTime.parse(time, timeFormatter);

		return LocalDateTime.of(localDate, localTime);
	}

	private static class TeamParseException extends Exception {
		private static final long serialVersionUID = 1L;

		public TeamParseException(String message) {
			super(message);
		}

	}

	private static class MatchParsException extends Exception {
		private static final long serialVersionUID = 1L;

		public MatchParsException(String message) {
			super(message);
		}
	}

}
