import { AwardPreset } from "../awards";
import { Preset, getPreset } from "../presets";
import Activity from "./activity";
import { TournamentConfig, TournamentOptions } from "./config";
import Team from "./team";

type TournamentInitialProps = {
  name?: string;
  numberOfTeams?: number;
  preset?: Preset;
  numberOfDays?: number;
};

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
