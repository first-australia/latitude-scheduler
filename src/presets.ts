import Activity from "./v8/activity";
import { TournamentConfig, TournamentOptions } from "./v8/config";
import initAusFLL from "./v8/initialise/ausFLL";
import Tournament from "./v8/tournament";

export const presets = ["ausFLL"] as const;

export type Preset = (typeof presets)[number];

type PresetReturn = {
  activities: Activity[];
  config: TournamentConfig;
  options: TournamentOptions;
};

export const initialise = (tournament: Tournament, preset: Preset) => {
  switch (preset) {
    case "ausFLL":
      return initAusFLL(tournament);
  }
};

export const getPreset = (preset: Preset): PresetReturn => {
  switch (preset) {
    case "ausFLL":
      return getPresetAUSFLL();
  }
};

const getPresetAUSFLL = (): PresetReturn => {
  return {
    activities: [],
    config: new TournamentConfig(),
    options: new TournamentOptions(),
  };
};
