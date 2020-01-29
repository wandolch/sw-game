import { Starship } from './starship.interface';
import { Creature } from './creature.interface';

export interface AppStateModel {
  starships: Starship[];
  creatures: Creature[];
  playedStarships: Starship[];
  playedCreatures: Creature[];
  counter: number[];
}
