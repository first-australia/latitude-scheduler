# Latitude - the FIRST Australia Scheduler (v8)

This repository is the latest iteration of the FIRST Australia scheduling software (primarily for use in scheduling FIRST LEGO League tournaments).

Here, the scheduler is implemented as a NodeJS (Typescript) package to be imported by frontend clients and used. For those who are familiar, the code here is an evolution of the "Tournament in a Box", used internationally since 2018.

## Installation

Install the package directly from NPM:

```bash
npm i --save latitude-scheduler
# OR
yarn add latitude-scheduler
# OR
pnpm i --save latitude-scheduler
```

##

## Development

Developing inside this repo is reasonably straightforward; the source code is in the `src` directory, tests are conducted using Jest, and we build the code using TSUP.

The code base is set up using PNPM, but you should be able to use NPM or Yarn as well.

```bash
pnpm test

pnpm build
```

For convenience, a basic main script has been set up which can run through some basic initialisation and scheduling - if you need to update this script, it's in src/index.ts; to run it, call `pnpm dev`.

## Scheduler

This section details how the scheduler itself is designed to work.

![image](https://github.com/first-australia/latitude-scheduler/assets/62322749/36c716f1-6f11-4bcf-85b3-b9351b9e051f)

The process is primarily divided into four stages:

### Initialise

First of all, basic information related to the tournament is required - including the start/end times of the event, the number of teams, number of days, etc. The scheduler will use this to auto-populate a number of key settings.

If running the scheduler from the tournament management system, this information should be pre-populated and require no manual entry.

The parameters captured at this stage are considered "functional configuration" - i.e. if any of them change, the schedule will need to be regenerated.

### Construct

In the second stage, the scheduler constructs a timetable based on the event parameters. This specifically involves generating every time slot that will need to be filled by a team - one per team for judging and one per team for each robot round (for FIRST LEGO League). These timeslots become immutable based on the functional config, and we know the schedule is incomplete or incorrect if any of these slots are not filled.

Time slots are organised by "Session", where each Session is a single event that a team needs to attend -- examples of sessions include Judging, Robot Round 2, Lunch, etc.

You can think of a Timeslot as the row in a table like the one below:

| Judging  | Room 1 | Room 2 | Room 3 | Room 4 |
| -------- | ------ | ------ | ------ | ------ |
| 9:00 AM  |        |        |        |        |
| 9:45 AM  |        |        |        |        |
| 10:30 AM |        |        |        |        |

So, each Timeslot will have as many team spaces as there are simultaneous teams competing.

### Fill/populate

Once you have a timetable comprised of all required timeslots, teams have to be assigned to each slot until every team is completing all required activities. Population is done one Session at a time, starting with sessions that affect all teams (e.g. breaks), then judging, then robot rounds.

Since there is the possibility of "dead ends", we start by randomising the list of teams; if we reach a dead end, we can restart the process with a different randomisation a bunch of times as it runs very quickly; there may well be ways to improve the reliability of this process, but we haven't developed them yet and random seeds work fine most of the time.

Time slots are filled one team spot at a time, using a "fill and swap" heuristic as described below:

1. If there is any unassigned team that can do this slot, put them in.
2. If there is not, go back over all previously filled slots and look for a team A which can do this time, where an unassigned team B can do their time.
3. Put team A in the current slot, and put team B into the slot vacated by team A.
4. If no team can be found which can swap in, this slot cannot be filled - a dead end has been reached.

By following this process, we make sure there is no empty slot -- as we move from the start of the timetable to the end, we maintain a filled schedule behind us. That way, as long as we get to the end of the timetable, we know the schedule is complete and will work.

The core method required to implement this strategy is `canDo: (Timeslot t, Team a) => boolean`

### Export

Finally, once the schedule is populated, we're ready to do exports. At this stage in the process, any of the "aesthetic configuration" should be able to be changed without regenerating the schedule - for example, team names, room names, etc.

The key exports for this stage are PDF exports showing the individual schedule for each Session (e.g. Match schedule).
