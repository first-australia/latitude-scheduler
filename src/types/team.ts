import { TimePoint } from "./datetime";
import Instance from "./instance";

export class Team {
  _id: string;
  _number: string;
  _name: string;

  affiliation: number;
  pitNum: number;
  extraTime: boolean = false;
  excludeJudging: boolean = false;
  /** When does the team arrive?  If undefined, assume they're there at event start */
  startTime?: TimePoint = undefined;
  /** When does the team leave?  If undefined, assume they're there until event ends */
  endTime?: TimePoint = undefined;

  isSurrogate: boolean = false;

  schedule: Instance[] = [];

  constructor(id, number) {
    this.number = number;
    this.name = "Team " + number;

    // this.id = new ShortUniqueId();
    this._id = id;

    // So far unused
    this.affiliation = number;
    this.pitNum = number;
    this.schedule = [];
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value.replace(/\s+/g, " ");
  }

  get number() {
    return this._number;
  }

  set number(value) {
    this._number = value;
  }

  static freeze(o) {
    return {
      _class: "Team",
      number: o.number,
      name: o.name,
      id: o.id,
      affiliation: o.affiliation,
      pitNum: o.pitNum,
      extraTime: o.extraTime,
      excludeJudging: o.excludeJudging,
      startTime: o.startTime,
      endTime: o.endTime,
      isSurrogate: o.isSurrogate,
      schedule: o.schedule,
    };
  }

  static thaw(o) {
    let T = new Team(o.id, o.number);
    T.name = o.name;
    T.affiliation = o.affiliation;
    T.pitNum = o.pitNum;
    T.extraTime = o.extraTime;
    T.excludeJudging = o.excludeJudging;
    T.startTime = o.startTime;
    T.endTime = o.endTime;
    T.isSurrogate = o.isSurrogate;
    T.schedule = o.schedule;
    return T;
  }
}
