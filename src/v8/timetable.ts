import Timeslot from "./timeslot";

export default class Timetable {
  timeslots: Timeslot[];

  constructor() {
    this.timeslots = [];
  }

  print() {
    for (const timeslot of this.timeslots) {
      timeslot.print();
    }
  }
}
