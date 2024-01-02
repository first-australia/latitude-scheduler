import { generateId } from "../utilities";

/**
 * Activity type for scheduling;  options are:
 * - all: all teams are scheduled at once
 * - single: each team will get a single run at this activity
 * - multiple: each team will get multiple runs at this activity
 */
export type ActivityType = "all" | "single" | "multiple";

/**
 * A single type of tournament activity.
 * e.g. Judging session, Lunch break, Robot Round 1
 */
export default class Activity {
  id: string;
  type: ActivityType;
  name: string;
  /**
   * How long (in minutes) is one session of this activity?
   * Specifically, how long is the team at the location
   */
  duration: number;
  /**
   * How long (in minutes) does it take to clean up after this activity?
   * Specifically, how long after a team is done can the next team start?
   */
  cleanup: number;
  /** When does the activity start?  In minutes from midnight on the first tournament day */
  start: number;

  /** Names of each location */
  locations: string[];
  constructor(
    name: string,
    type: ActivityType,
    start: number,
    duration: number,
    cleanup: number
  ) {
    this.id = generateId();
    this.name = name;
    this.type = type;
    this.duration = duration;
    this.cleanup = cleanup;
    this.start = start;
    this.locations = [];
  }
}
