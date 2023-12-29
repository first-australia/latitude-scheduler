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
    this.start = start;
    this.duration = duration;
    this.teams = new Array(numTeams).fill(null);
  }
}
