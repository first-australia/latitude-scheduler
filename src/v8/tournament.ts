import { AwardPreset } from "../awards";
import { Preset, getPreset } from "../presets";
import Activity from "./activity";
import Team from "./team";

type TournamentInitialProps = {
  name?: string;
  numberOfTeams?: number;
  preset?: Preset;
  numberOfDays?: number;
};

/** Aesthetic options for tournament export */
export class TournamentOptions {
  dayNames: string[];
  awardPreset: AwardPreset = "reqopt0f";

  constructor() {}
}

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

  numberOfDays: number;

  constructor() {}
}

export default class Tournament {
  name: string;
  teams: Team[];
  activities: Activity[];
  options: TournamentOptions;
  config: TournamentConfig;

  constructor({
    name = "Tournament",
    numberOfDays,
    numberOfTeams = 24,
    preset = "AUS FLL",
  }: TournamentInitialProps) {
    this.name = name;
    this.teams = new Array(numberOfTeams)
      .fill(null)
      .map((_, i) => new Team(i + 1));
    const { activities, options, config } = getPreset(preset);

    this.activities = activities;
    this.options = options;
    this.config = {
      ...config,
      numberOfDays: numberOfDays ?? config.numberOfDays,
    };
  }
}
