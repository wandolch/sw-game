import { Creature } from '../interfaces/creature.interface';

export class SetPlayedCreatures {
  static readonly type = '[app] SetPlayedCreatures';
  constructor(public playedCreatures: Creature[]) {}
}
