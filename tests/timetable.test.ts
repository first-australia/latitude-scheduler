import Timeslot from "../src/v8/timeslot";
import Timetable from "../src/v8/timetable";

test("Creates a timetable", () => {
  const timetable = new Timetable();
  expect(timetable).toBeInstanceOf(Timetable);
  for (let i = 0; i < 4; i++) {
    timetable.timeslots.push(new Timeslot(9 * 60 + i * 45, 45, 4));
  }
  timetable.print();
});
