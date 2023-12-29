export class TournamentDateConfig {
  days: string[] = ["Day 1"];
}

type TimePointFormat = "full" | "time-only" | "day-only";

export class TimePoint {
  day: number;
  time: number;

  constructor(day: number, time: number) {
    this.day = day;
    this.time = time;
  }

  toString(format: TimePointFormat = "full"): string {
    switch (format) {
      case "full":
        return `${this.day} ${this.time}`;
      case "time-only":
        return `${this.time}`;
      case "day-only":
        return `${this.day}`;
    }
  }

  clone(add: number = 0): TimePoint {
    const newTime = this.time + add;
    if (newTime < 0) return new TimePoint(this.day - 1, 1440 + newTime);
    if (newTime >= 1440) return new TimePoint(this.day + 1, newTime - 1440);
    return new TimePoint(this.day, this.time);
  }
}

export class TimeSlot {
  start: TimePoint;
  /** Duration of this timeslot, in minutes */
  duration: number;
}
