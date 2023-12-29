import Activity from "./v8/activity";
import { TournamentConfig, TournamentOptions } from "./v8/tournament";

export const presets = ["AUS FLL"] as const;

export type Preset = (typeof presets)[number];

type PresetReturn = {
  activities: Activity[];
  config: TournamentConfig;
  options: TournamentOptions;
};

export const getPreset = (preset: Preset): PresetReturn => {
  switch (preset) {
    case "AUS FLL":
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
