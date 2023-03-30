import { useMemo } from "react";
import { Game } from "../../../rest/data/Game";


export interface MatchStatisticsEntry {
    homeValue: number;
    guestValue: number;
}

export interface MatchStatistics {
    points: MatchStatisticsEntry;
    sets: MatchStatisticsEntry;
    lastSet: MatchStatisticsEntry;
    closeSets: MatchStatisticsEntry;
    comeback: MatchStatisticsEntry;
}

export function useMatchStatistics(games: Array<Game>) {

    let statistics: MatchStatistics = useMemo(() => {

        let statistics: MatchStatistics = {
            points: { homeValue: 0, guestValue: 0 },
            sets: { homeValue: 0, guestValue: 0 },
            lastSet: { homeValue: 0, guestValue: 0 },
            closeSets: { homeValue: 0, guestValue: 0 },
            comeback: { homeValue: 0, guestValue: 0 },
        }

        for (let game of games) {
            statistics.sets.homeValue += game.homeSets;
            statistics.sets.guestValue += game.guestSets;

            if (game.state === "FINISHED") {
                if (game.homeSets - game.guestSets === 1){
                    statistics.lastSet.homeValue += 1;

                    let lastSet = game.sets[game.sets.length-1];
                    let secondLastSet = game.sets[game.sets.length-2];
                    if(lastSet.homeScore > lastSet.guestScore && secondLastSet.homeScore > secondLastSet.guestScore)
                        statistics.comeback.homeValue += 1;

                }if (game.homeSets - game.guestSets === -1){
                    statistics.lastSet.guestValue += 1;


                    let lastSet = game.sets[game.sets.length-1];
                    let secondLastSet = game.sets[game.sets.length-2];
                    if(lastSet.guestScore > lastSet.homeScore && secondLastSet.guestScore > secondLastSet.homeScore)
                        statistics.comeback.guestValue += 1;
                }
            }            

            for (let set of game.sets) {
                if (set.state === "FINISHED") {
                    if (set.homeScore - set.guestScore === 2)
                        statistics.closeSets.homeValue += 1;
                    else if (set.homeScore - set.guestScore === -2)
                        statistics.closeSets.guestValue += 1;
                }

                statistics.points.homeValue += (set.homeScore === -1 ? 0 : set.homeScore);
                statistics.points.guestValue += (set.guestScore === -1 ? 0 : set.guestScore);
            }
        }

        return statistics;
    }, [games]);

    return statistics;
}