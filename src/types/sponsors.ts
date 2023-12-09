export type Sponsor = {
  name: string;
  /** Logo as a link */
  logo: string;
};

export class TournamentSponsors {
  private _national: Sponsor[] = [];
  private _local: Sponsor[] = [];

  constructor() {}

  get national(): Sponsor[] {
    return this._national;
  }

  get local(): Sponsor[] {
    return this._local;
  }

  addNationalSponsor(sponsor: Sponsor) {
    this._national.push(sponsor);
  }

  addLocalSponsor(sponsor: Sponsor) {
    this._local.push(sponsor);
  }

  deleteLocalSponsor(idx: number) {
    this._local.splice(idx, 1);
  }

  deleteNationalSponsor(idx: number) {
    this._national.splice(idx, 1);
  }
}
