export const awardPresets = [
  "cmp",
  "req",
  "reqopt0f",
  "reqopt1f",
  "reqopt2f",
  "reqopt3f",
] as const;

export type AwardPreset = (typeof awardPresets)[number];

export const awardStyles: Record<AwardPreset, string> = {
  cmp: "Champion only",
  req: "Required only",
  reqopt0f: "Required and optional (winner only)",
  reqopt1f: "Required and optional (1 finalist )",
  reqopt2f: "Required and optional (2 finalist )",
  reqopt3f: "Required and optional (3 finalist )",
};

type AwardOptions = {
  prefix: string;
  /** Is this award included in the "required" set?  Default false */
  required?: boolean;
  /** Does this award come with finalists? Default true */
  hasFinalists?: boolean;
};

const awardPrefixes = [
  "Champion's",
  "Coach/Mentor",
  "Robot Performance",
  "Robot Design",
  "Innovation Project",
  "Core Values",
  "Motivate",
  "Rising All-Star",
  "Engineering Excellence",
  "Breakthrough",
] as const;
type AwardName = (typeof awardPrefixes)[number];

export const awards: Record<AwardName, AwardOptions> = {
  "Champion's": { prefix: "Champion's", required: true },
  "Coach/Mentor": {
    prefix: "Coach/Mentor",
    hasFinalists: false,
    required: true,
  },
  "Robot Performance": { prefix: "Robot Performance", required: true },
  "Robot Design": { prefix: "Robot Design", required: true },
  "Innovation Project": { prefix: "Innovation Project", required: true },
  "Core Values": { prefix: "Core Values", required: true },
  Motivate: { prefix: "Motivate", required: false },
  "Rising All-Star": { prefix: "Rising All-Star", required: false },
  "Engineering Excellence": {
    prefix: "Engineering Excellence",
    required: false,
  },
  Breakthrough: { prefix: "Breakthrough", required: false },
};

export const awardPresetToList = (preset: AwardPreset) => {
  const list: string[] = [];

  if (preset === "cmp") {
    return [awards["Champion's"].prefix + " Award"];
  }
  let numFinalists = 0;
  const useOptional = preset !== "req";
  switch (preset) {
    case "reqopt0f":
      numFinalists = 0;
      break;
    case "reqopt1f":
      numFinalists = 1;
      break;
    case "reqopt2f":
      numFinalists = 2;
      break;
    case "reqopt3f":
      numFinalists = 3;
      break;
  }
  for (const awardName in awards) {
    const award = awards[awardName as AwardName];
    if (award.required || useOptional) {
      list.push(award.prefix + " Award");
    }
    let i = 1;
    // Todo - we can easily add here "2nd place", "3rd place", etc if we want.
    if (award.hasFinalists && i <= numFinalists) {
      list.push(award.prefix + " Award Finalist");
      i++;
    }
  }
  return list;
};
