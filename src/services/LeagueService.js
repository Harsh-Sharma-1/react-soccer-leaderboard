import axios from 'axios';

/**
 * A class representing a service that processes the data for match schedule
 * and generates leaderboard.
 *
 * NOTE: MAKE SURE TO IMPLEMENT ALL EXISITNG METHODS BELOW WITHOUT CHANGING THE INTERFACE OF THEM,
 *       AND PLEASE DO NOT RENAME, MOVE OR DELETE THIS FILE.
 *
 */

const API_URL = 'http://localhost:3001';
class LeagueService {
    matches = [];
    /**
     * Sets the match schedule.
     * Match schedule will be given in the following form:
     * [
     *      {
     *          matchDate: [TIMESTAMP],
     *          stadium: [STRING],
     *          homeTeam: [STRING],
     *          awayTeam: [STRING],
     *          matchPlayed: [BOOLEAN],
     *          homeTeamScore: [INTEGER],
     *          awayTeamScore: [INTEGER]
     *      },
     *      {
     *          matchDate: [TIMESTAMP],
     *          stadium: [STRING],
     *          homeTeam: [STRING],
     *          awayTeam: [STRING],
     *          matchPlayed: [BOOLEAN],
     *          homeTeamScore: [INTEGER],
     *          awayTeamScore: [INTEGER]
     *      }
     * ]
     *
     * @param {Array} matches List of matches.
     */
    setMatches(matches) {
        this.matches = matches;
    }

    /**
     * Returns the full list of matches.
     *
     * @returns {Array} List of matches.
     */
    getMatches() {
        return this.matches;
    }

    /**
     * Returns the leaderboard in a form of a list of JSON objecs.
     *
     * [
     *      {
     *          teamName: [STRING]',
     *          matchesPlayed: [INTEGER],
     *          goalsFor: [INTEGER],
     *          goalsAgainst: [INTEGER],
     *          points: [INTEGER]
     *      },
     * ]
     *
     * @returns {Array} List of teams representing the leaderboard.
     */

    getPoints(score1, score2) {
        if (score1 < score2) {
            return 0;
        }

        if (score1 > score2) {
            return 3;
        } else if (score1 === score2) {
            return 1;
        }
    }

    getLeaderboard() {
        let data = {};
        this.matches.forEach((item) => {
            if (data[item.awayTeam]) {
                data[item.awayTeam] = {
                    ...data[item.awayTeam],
                    matchesPlayed: data[item.awayTeam].matchesPlayed + 1,
                    goalsFor: data[item.awayTeam].goalsFor + item.awayTeamScore,
                    goalsAgainst:
                        data[item.awayTeam].goalsAgainst + item.homeTeamScore,
                    points:
                        data[item.awayTeam].points +
                        this.getPoints(item.awayTeamScore, item.homeTeamScore),
                };
            } else {
                data[item.awayTeam] = {
                    teamName: item.awayTeam,
                    matchesPlayed: 1,
                    goalsFor: item.awayTeamScore,
                    goalsAgainst: item.homeTeamScore,
                    points: this.getPoints(
                        item.awayTeamScore,
                        item.homeTeamScore
                    ),
                };
            }

            if (data[item.homeTeam]) {
                data[item.homeTeam] = {
                    ...data[item.homeTeam],
                    matchesPlayed: data[item.homeTeam].matchesPlayed + 1,
                    goalsFor: data[item.homeTeam].goalsFor + item.homeTeamScore,
                    goalsAgainst:
                        data[item.homeTeam].goalsAgainst + item.awayTeamScore,
                    points:
                        data[item.homeTeam].points +
                        this.getPoints(item.homeTeamScore, item.awayTeamScore),
                };
            } else {
                data[item.homeTeam] = {
                    teamName: item.homeTeam,
                    matchesPlayed: 1,
                    goalsFor: item.homeTeamScore,
                    goalsAgainst: item.awayTeamScore,
                    points: this.getPoints(
                        item.homeTeamScore,
                        item.awayTeamScore
                    ),
                };
            }
        });

        const sortedLeaderboard = Object.values(data).sort((a, b) => {
            if (b.points !== a.points) {
                return b.points - a.points;
            }
            const aGoalDiff = a.goalsFor - a.goalsAgainst;
            const bGoalDiff = b.goalsFor - b.goalsAgainst;
            if (bGoalDiff !== aGoalDiff) {
                return bGoalDiff - aGoalDiff;
            }
            if (b.goalsFor !== a.goalsFor) {
                return b.goalsFor - a.goalsFor;
            }
            return a.teamName.localeCompare(b.teamName);
        });

        return sortedLeaderboard;
    }

    /**
     * Asynchronic function to fetch the data from the server.
     */
    async fetchData() {
        let token = null;

        if (localStorage.getItem('JWT_TOKEN_LEADERBOARD')) {
            token = localStorage.setItem('JWT_TOKEN_LEADERBOARD');
        } else {
            const res = await axios.get(`${API_URL}/api/v1/getAccessToken`);
            token = res.data.access_token;
        }

        const matches = await axios.get(`${API_URL}/api/v1/getAllMatches`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        this.setMatches(matches.data.matches);
    }
}

export default LeagueService;
