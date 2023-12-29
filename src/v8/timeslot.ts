const toTimeString = (minutes: number): string => {
  const day = Math.floor(minutes / 1440);
  const hours = Math.floor((minutes % 1440) / 60);
  const mins = minutes % 60;
  // pad mins with a leading zero if necessary
  const minsStr = mins < 10 ? `0${mins}` : `${mins}`;
  return (day > 0 ? `Day ${day + 1} ` : "") + `${hours}:${minsStr}`;
};

/**
 * A time slot represents a single point in time where a certain number of teams
 * is performing an activity.  This class also contains the specific teams doing
 * that activity, as the scheduler identifies and fills them.
 */
export default class Timeslot {
  activityId: string;
  /** Number of minutes since midnight on the first day of the tournament. */
  start: number;
  duration: number;
  teams: (string | null)[];
  constructor(start: number, duration: number, numTeams: number) {
    this.activityId = "";
    this.start = start;
    this.duration = duration;
    this.teams = new Array(numTeams).fill(null);
  }

  print() {
    console.log(
      `${toTimeString(this.start)}\t${this.teams
        .map((t) => t ?? " - ")
        .join("\t")}`
    );
  }
}
