import { TimePoint } from "./datetime";

/**
 num: Count of instance
 time: Time (mins) of instance
 teams: List of teams in instance
 loc: Location offset (i.e. for staggered sessions, location index of where the teams begin)
 extra: true/false if extra time is allocated
 */
export default class Instance {
  session_id: string;
  num: number;
  time: TimePoint;
  teams: string[];
  loc: number;
  surrogates: number = 0;
  standins: number = 0;
  extra: boolean = false;

  constructor(session_id, num, time, teams, loc) {
    this.session_id = session_id;
    this.num = num;
    this.time = time;
    this.teams = teams;
    this.loc = loc;
  }

  static freeze(o) {
    return {
      _class: "Instance",
      session_id: o.session_id,
      num: o.num,
      time: o.time,
      teams: o.teams,
      loc: o.loc,
      surrogates: o.surrogates,
      standins: o.standins,
      extra: o.extra,
    };
  }

  static thaw(o) {
    let I = new Instance(o.session_id, o.num, o.time, o.teams, o.loc);
    I.surrogates = o.surrogates;
    I.standins = o.standins;
    I.extra = o.extra;
    return I;
  }
}
