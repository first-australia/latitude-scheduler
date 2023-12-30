import { AwardPreset } from "../awards";

/** Functional options for configuring a tournament */
export class TournamentConfig {
  /**
   * Start time of the tournament (nothing can be scheduled before this)
   *  in minutes on the first day, from 0 (midnight) to 1440
   */
  startTime: number;

  /**
   * End time of the tournament (nothing can be scheduled after this)
   *  in minutes on the last day, from 0 (midnight) to 1440
   */
  endTime: number;
  /** For how many days does this tournament run? */
  numberOfDays: number;

  constructor() {}
}

/** Aesthetic options for tournament export */
export class TournamentOptions {
  /**
   * What does this tournament call its days?
   * e.g. Day 1, Day 2; Thu, Fri; etc
   */
  dayNames: string[];
  awardPreset: AwardPreset = "reqopt0f";

  constructor() {}
}
