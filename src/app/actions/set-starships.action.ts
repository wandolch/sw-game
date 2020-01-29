import { Starship } from '../interfaces/starship.interface';

export class SetStarships {
  static readonly type = '[app] SetStarships';
  constructor(public starships: Starship[]) {
  }
}
