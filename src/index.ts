import Timeslot from "./v8/timeslot";
import Timetable from "./v8/timetable";

export function add(a: number, b: number): number {
  return a + b;
}

export function subtract(a: number, b: number): number {
  return a - b;
}

const timetable = new Timetable();
for (let i = 0; i < 4; i++) {
  timetable.timeslots.push(new Timeslot(9 * 60 + i * 45, 45, 4));
}
timetable.print();
