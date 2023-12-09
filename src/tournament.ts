import { AwardPreset, awardPresetToList, awardPresets } from "./awards";
import { TimePoint, TournamentDateConfig } from "./types/datetime";
import { TournamentSponsors } from "./types/sponsors";
import { Team } from "./types/team";
import { Version } from "./types/version";

export type TournamentState = "Initialising" | "Configuring" | "Ready";

export default class Tournament {
  _version: Version;
  _title: string;
  _state: TournamentState = "Initialising";
  _uid_counter: number = 1;
  /** When the tournament must open - nothing can be scheduled before this */
  _startTime: TimePoint;
  /** When the tournament must close - nothing can be scheduled after this */
  _endTime: TimePoint;
  _days: TournamentDateConfig;

  _minTravel: number = 10;
  _extraTime: number = 5;
  _sessions = [];
  _pilot = false;
  _consolidatedAwards = false;
  _awardStyle: AwardPreset = "reqopt0f";
  _judgesAwards = 0;
  _awards = awardPresetToList(this.awardStyle);
  _nTables = 4;
  _nPracs = 0;
  _sponsors: TournamentSponsors = new TournamentSponsors();

  _volunteers?: string[];
  _tempNames?: string[];
  _pageFormat?: string;

  _teams: Team[] = [];

  _errors: number;

  constructor(
    version,
    title = "Tournament",
    nTeams = 24,
    startTime = new TimePoint(0, 9 * 60),
    endTime = new TimePoint(0, 9 * 17)
  ) {
    this._version = version;
    this.title = title;
    let id = Math.floor(Math.random() * 100 + 1);
    let A: Team[] = [];
    while (nTeams > 0) {
      A.push(new Team(id, nTeams));
      nTeams--;
      id += Math.floor(Math.random() * 100 + 1);
    }

    this._uid_counter = 1;

    this.teams = A.sort((a, b) => {
      return parseInt(a.number, 10) - parseInt(b.number, 10);
    });

    this.startTime = startTime;
    this.endTime = endTime;

    // PreComputedImages.nationalSponsors.forEach((x) =>
    //   this.addNationalSponsor(x)
    // );

    this._volunteers = undefined;
    this._tempNames = undefined;
    this._pageFormat = undefined;

    // console.log(this.logoBotRight);
    this._errors = Infinity;
    // this.populateFLL();
  }

  get version() {
    return this._version;
  }

  get title() {
    return this._title;
  }

  set title(value) {
    this._title = value;
  }

  get startTime() {
    return this._startTime;
  }

  set startTime(value) {
    this._startTime = value;
  }

  get endTime() {
    return this._endTime;
  }

  set endTime(value) {
    this._endTime = value;
  }

  get sessions() {
    return this._sessions;
  }

  set sessions(value) {
    this._sessions = value;
  }

  get teams() {
    return this._teams;
  }

  set teams(value) {
    this._teams = value;
  }

  get awards() {
    return this._awards;
  }

  set awards(value) {
    this._awards = value;
  }

  get judgesAwards() {
    return this._judgesAwards;
  }

  set judgesAwards(value) {
    this._judgesAwards = value;
  }

  get consolidatedAwards() {
    return this._consolidatedAwards;
  }

  set consolidatedAwards(value) {
    this._consolidatedAwards = value;
  }

  get awardStyle() {
    return this._awardStyle;
  }

  set awardStyle(value) {
    this._awardStyle = value;
  }

  get awardStyleIdx() {
    return awardPresets.findIndex((x) => {
      return x === this._awardStyle;
    });
  }

  set awardStyleIdx(value: number) {
    this._awardStyle = awardPresets[value];
    this._awards = awardPresetToList(awardPresets[value]);
    console.log(this._awards);
  }

  get awardPerc() {
    let idx = this.awardStyleIdx;
    console.log("Award style index: " + this.awardStyleIdx);
    console.log("Award style: " + this._awardStyle);

    let nTrophies = this.awards.length;
    //   Tournament.AWARD_NAMES[this.awardStyleIdx].length + this.judgesAwards;
    return Math.round((100 * nTrophies) / this.teams.length);
  }

  get minTravel() {
    return this._minTravel;
  }

  set minTravel(value) {
    this._minTravel = value;
  }

  get extraTime() {
    return this._extraTime;
  }

  set extraTime(value) {
    this._extraTime = value;
  }

  get nTables() {
    return this._nTables;
  }

  set nTables(value) {
    this._nTables = value;
  }

  get state() {
    return this._state;
  }

  set state(d) {
    this._state = d;
  }

  get pilot() {
    return this._pilot;
  }

  set pilot(p) {
    this._pilot = p;
  }

  get volunteers() {
    return this._volunteers;
  }

  set volunteers(p) {
    this._volunteers = p;
  }

  get nDays() {
    return this._days.days.length;
  }

  set nDays(value) {
    let A = this.days.days;
    while (A.length < value) A.push("Day " + (this.days.days.length + 1));
    while (A.length > value) A.pop();
    this.days.days = A;
  }

  get days() {
    return this._days;
  }

  // When changing the days, we have to make sure every DateTime gets the updated reference.
  set days(value) {
    this._days = value;
    // this.startTime.days = this._days;
    // this.endTime.days = this._days;
    // this.sessions.forEach((S) => {
    //   S.startTime.days = this._days;
    //   S.actualStartTime.days = this._days;
    //   S.endTime.days = this._days;
    //   S.actualEndTime.days = this._days;
    // });
    // this.teams.forEach((T) => {
    //   T.startTime.days = this._days;
    //   T.endTime.days = this._days;
    // });
  }

  addLocalSponsor(value) {
    this._sponsors.addLocalSponsor(value);
  }

  addNationalSponsor(value) {
    this._sponsors.addNationalSponsor(value);
  }

  deleteLocalSponsor(idx) {
    this._sponsors.deleteLocalSponsor(idx);
  }

  static freeze(o) {
    return {
      _class: "Tournament",
      _version: o._version,
      _title: o._title,
      _teams: o._teams,
      uid_counter: o.uid_counter,
      _startTime: o._startTime,
      _endTime: o._endTime,
      _sessions: o._sessions,
      _days: o._days,
      _pilot: o._pilot,
      _nTables: o._nTables,
      errors: o.errors,
      _extraTime: o._extraTime,
      _minTravel: o._minTravel,
      _judgesAwards: o._judgesAwards,
      _awards: o._awards,
      _consolidatedAwards: o._consolidatedAwards,
      _awardStyle: o._awardStyle,
      _volunteers: o._volunteers,
      pageFormat: o.pageFormat,
      sponsors: o.sponsors.local,
    };
  }

  static thaw(o) {
    let E = new Tournament(o._version, o._title);
    console.log("Saved object:");
    console.log(o);
    E._teams = o._teams;
    E._uid_counter = o.uid_counter;
    E._startTime = o._startTime;
    E._endTime = o._endTime;
    E._minTravel = o._minTravel;
    E._extraTime = o._extraTime;
    E._sessions = o._sessions;
    E._days = o._days;
    E._pilot = o._pilot;
    E._nTables = o._nTables || 4;
    E._errors = o.errors;
    E._judgesAwards = o._judgesAwards;
    E._awards = o._awards;
    E._consolidatedAwards = o._consolidatedAwards;
    E._awardStyle = o._awardStyle || awardPresets[2];
    E._volunteers = o._volunteers;
    E._sponsors = o.sponsors;
    E._pageFormat = o.pageFormat;
    if (!E._errors) E._errors = Infinity;
    console.log(E);
    return E;
  }
}
