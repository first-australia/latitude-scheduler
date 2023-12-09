import { TimePoint } from "./datetime";

export const FillerPolicies = {
  blank: "Leave blanks",
  surrogates: "Use surrogates",
};
export type FillerPolicy = keyof typeof FillerPolicies;

export class SessionType {
  _name: string;
  _priority: number;
  _defaultTitle: string;
  _defaultLocations: string;
  _fillerPolicy: FillerPolicy;
  constructor(
    uid,
    name,
    priority,
    defaultTitle,
    defaultLocations,
    fillerPolicy: FillerPolicy = "blank"
  ) {
    this._name = name;
    this._priority = priority;
    this._defaultTitle = defaultTitle;
    this._fillerPolicy = fillerPolicy;
    this._defaultLocations = defaultLocations;
  }

  get name() {
    return this._name;
  }

  get priority() {
    return this._priority;
  }

  get defaultTitle() {
    return this._defaultTitle;
  }

  get fillerPolicy() {
    return this._fillerPolicy;
  }

  get defaultLocations() {
    return this._defaultLocations;
  }

  static freeze(o) {
    return {
      _class: "SessionType",
      _name: o.name,
    };
  }

  static thaw(o) {
    let V: SessionType | null = null;
    Object.values(TYPES).forEach((v) => {
      if (o._name === v.name) console.log("MATCH");
      if (o._name === v.name) V = v;
    });
    return V;
  }
}

export const POLICIES = { blank: "Leave blanks", surrogates: "Use surrogates" };

export const TYPES = {
  JUDGING: new SessionType(16, "Judging", 8, "Judging", "Room"),
  INSPECTION: new SessionType(24, "Inspection", 12, "Inspection", "Room"),
  MATCH_ROUND: new SessionType(
    32,
    "Rounds",
    16,
    "Round",
    "Table",
    "surrogates"
  ),
  MATCH_ROUND_PRACTICE: new SessionType(
    33,
    "Practice Rounds",
    128,
    "Practice Round",
    "Table",
    "surrogates"
  ),
  MATCH_FILLER: new SessionType(
    48,
    "Matches",
    32,
    "Qualifying Match",
    "Field",
    "surrogates"
  ),
  MATCH_FILLER_PRACTICE: new SessionType(
    49,
    "Practice Matches",
    129,
    "Practice Match",
    "Field",
    "surrogates"
  ),
  BREAK: new SessionType(64, "Breaks", 0, "Break", "Everywhere"),
};

export default class Session {
  private _id: string;
  private _type: SessionType;
  private _name: string;
  private _locations: string[];
  private _universal: boolean;
  /** Start time of session - if undefined, let the scheduler choose */
  private _startTime?: TimePoint;
  /** End time of session - if undefined, let the scheduler choose */
  private _endTime?: TimePoint;
  private _actualStartTime?: TimePoint;
  private _actualEndTime?: TimePoint;
  private _noPrac: boolean;
  private _nSims: number;
  private _len: number = 30;
  private _buf: number = 15;
  private _overlap: number = 0;
  private _schedule: number[] = [];
  private _errors: number = 0;
  private _instances: number = 1;
  /** Should the first round be a little longer? */
  private _extraTimeFirst: boolean = false;
  /** Extra time every N round */
  private _extraTimeEvery: number = 0;
  /**
   * (Breaks only) Which sessions a break applies to
   * @todo - use inheritance for this?
   */
  private _appliesTo: string[] = [];
  /**
   * Does this session use surrogates?
   */
  private _usesSurrogates: boolean = false;

  constructor(
    uid,
    type,
    name,
    nLocs = 4,
    startTime?: TimePoint,
    endTime?: TimePoint,
    noPractice = false
  ) {
    this._id = uid;
    this._type = type;

    this._name = name ? name : this.type.defaultTitle + " " + this._id;
    this._noPrac = noPractice;

    let locations: string[] = [];
    for (let i = 1; i <= nLocs; i++)
      locations.push(this.type.defaultLocations + " " + i);
    this._locations = locations;

    this._universal = false;

    this._startTime = startTime;
    this._endTime = endTime;
    if (startTime) this.actualStartTime = startTime.clone();
    if (endTime) this.actualEndTime = endTime.clone();

    this._nSims = this.locations.length;
  }

  // These are immutable
  get type() {
    return this._type;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }

  get nLocs() {
    return this._locations.length;
  }

  set nLocs(value) {
    while (this.nLocs < value)
      this._locations.push(this.type.defaultLocations + " " + (this.nLocs + 1));
    while (this.nLocs > value) this._locations.pop();
    if (this.type === TYPES.JUDGING) this.nSims = this.nLocs;
  }

  get locations() {
    return this._locations;
  }

  set locations(value) {
    this._locations = value;
  }

  get schedule() {
    return this._schedule;
  }

  set schedule(value) {
    this._schedule = value;
  }

  get nSims() {
    return this._nSims;
  }

  set nSims(value) {
    this._nSims = value;
  }

  get startTime() {
    return this._startTime;
  }

  // TODO clone value here so we don't have to everywhere else.
  set startTime(value) {
    this._startTime = value;
    if (value) this._actualStartTime = value.clone();
  }

  get endTime() {
    return this._endTime;
  }

  set endTime(value) {
    this._endTime = value;
  }

  get actualEndTime() {
    if (this.type === TYPES.BREAK) return this._endTime;
    return this._actualEndTime;
  }

  set actualEndTime(value) {
    this._actualEndTime = value;
  }

  get actualStartTime() {
    if (this.type === TYPES.BREAK) return this._startTime;
    return this._actualStartTime;
  }

  set actualStartTime(value) {
    this._actualStartTime = value;
  }

  get len() {
    return this._type === TYPES.BREAK ? 0 : this._len;
  }

  set len(value) {
    this._len = value;
  }

  get overlap() {
    return this._overlap;
  }

  set overlap(value) {
    if (value >= 0) this._overlap = value;
  }

  get buf() {
    return this._type === TYPES.BREAK && this.startTime && this.endTime
      ? this.endTime.time - this.startTime.time
      : this._buf;
  }

  set buf(value) {
    this._buf = value;
  }

  get errors() {
    return this._errors;
  }

  set errors(value) {
    this._errors = value;
  }

  get instances() {
    return this._instances;
  }

  set instances(value) {
    this._instances = value;
  }

  get extraTimeFirst() {
    return this._extraTimeFirst;
  }

  set extraTimeFirst(value) {
    this._extraTimeFirst = value;
  }

  get extraTimeEvery() {
    return this._extraTimeEvery;
  }

  set extraTimeEvery(value) {
    this._extraTimeEvery = value;
  }

  get universal() {
    return this._universal;
  }

  set universal(value) {
    this._universal = value;
  }

  get appliesTo() {
    return this._appliesTo;
  }

  set appliesTo(value) {
    this._appliesTo = value;
  }

  get noPractice() {
    return this._noPrac;
  }

  set noPractice(value) {
    this._noPrac = value;
  }

  // Does this session apply to id?
  applies(id) {
    if (this.universal) return true;
    else return this.appliesTo.includes(id);
  }

  get usesSurrogates() {
    return this._usesSurrogates;
  }

  set usesSurrogates(value) {
    this._usesSurrogates = value;
  }

  static freeze(o) {
    return {
      _class: "SessionParams",
      _id: o._id,
      _type: o._type,
      _name: o._name,
      _locations: o._locations,
      _universal: o._universal,
      _startTime: o._startTime,
      _endTime: o._endTime,
      _actualStartTime: o._actualStartTime,
      _actualEndTime: o._actualEndTime,
      _nSims: o._nSims,
      _len: o._len,
      _buf: o._buf,
      _overlap: o._overlap,
      _schedule: o._schedule,
      _errors: o._errors,
      _instances: o._instances,
      _extraTimeFirst: o._extraTimeFirst,
      _extraTimeEvery: o._extraTimeEvery,
      _appliesTo: o._appliesTo,
      _noPrac: o._noPrac,
      _usesSurrogates: o._usesSurrogates,
    };
  }

  static thaw(o) {
    let S = new Session(o._id, o._type, o._name);
    S._locations = o._locations;
    S._universal = o._universal;
    S._startTime = o._startTime;
    S._endTime = o._endTime;
    if (
      S._endTime?.time === undefined &&
      S._startTime &&
      o._actualEndTime.mins === null
    )
      S._endTime = S._startTime.clone(30);
    else if (S._endTime?.time === undefined) {
      S._endTime = o._actualEndTime.clone();
    }
    S._actualStartTime = o._actualStartTime;
    S._actualEndTime = o._actualEndTime;
    S._nSims = o._nSims;
    S._len = o._len;
    S._buf = o._buf;
    S._overlap = o._overlap;
    if (typeof o._overlap === "undefined") S._overlap = 0;
    S._schedule = o._schedule;
    S._errors = o._errors;
    S._instances = o._instances;
    S._extraTimeFirst = o._extraTimeFirst;
    S._extraTimeEvery = o._extraTimeEvery;
    S._appliesTo = o._appliesTo;
    S._noPrac = o._noPrac;
    S._usesSurrogates = o._usesSurrogates;
    return S;
  }
}
