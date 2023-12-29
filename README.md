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

## Scheduler

This section details how the scheduler itself is designed to work.
