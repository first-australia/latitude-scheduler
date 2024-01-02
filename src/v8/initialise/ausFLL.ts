import Activity from "../activity";
import Tournament from "../tournament";

const initAusFLL = (tournament: Tournament) => {
  let time = tournament.config.startTime;
  const numTeams = tournament.teams.length;
  const numTables = 4;

  tournament.activities.push(
    new Activity("Opening Ceremony", "all", time, 30, 0)
  );
  tournament.activities.push(new Activity("Lunch", "all", 12 * 60, 30, 0));
  tournament.activities.push(
    new Activity(
      "Closing Ceremony",
      "all",
      tournament.config.endTime - 30,
      30,
      0
    )
  );
  const availableTime =
    tournament.config.endTime - tournament.config.startTime - 60 - 30;
  const matchesPerRound = Math.ceil(numTeams / 2);
  const timeForRound = Math.ceil(availableTime / 3);
  const matchLength = Math.ceil(timeForRound / matchesPerRound);
  const matchDuration = Math.max(Math.ceil(matchLength / 2), 4);
  const matchCleanup = matchLength - matchDuration;
  time += 30;
  tournament.activities.push(new Activity("Judging", "single", time, 45, 0));
  tournament.activities.push(
    new Activity("Round 1", "single", time, matchDuration, matchCleanup)
  );
  time += matchLength * matchesPerRound;
  tournament.activities.push(new Activity("Round 2", "single", time, 4, 2));
  time += matchLength * matchesPerRound;
  tournament.activities.push(new Activity("Round 3", "single", time, 4, 2));
};

export default initAusFLL;
