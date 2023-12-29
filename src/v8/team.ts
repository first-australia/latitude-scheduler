export default class Team {
  teamNumber: number;
  teamName: string;

  constructor(number: number, name?: string) {
    this.teamNumber = number;
    this.teamName = name ?? `Team ${number}`;
  }
}
