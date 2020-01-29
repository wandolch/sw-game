import { Creature } from '../interfaces/creature.interface';

export class SetCreatures {
  static readonly type = '[app] SetCreatures';
  constructor(public creatures: Creature[]) {}
}
