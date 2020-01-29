import { Starship } from '../interfaces/starship.interface';

export class SetPlayedStarships {
  static readonly type = '[app] SetPlayedStarships';
  constructor(public playedStarships: Starship[]) {}
}
