import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { Starship } from '../interfaces/starship.interface';
import { Creature } from '../interfaces/creature.interface';
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppStoreService {

  @Select(state => state.app.starships) starships$: Observable<Starship[]>;
  @Select(state => state.app.creatures) creatures$: Observable<Creature[]>;
  @Select(state => state.app.playedStarships) playedStarships$: Observable<Starship[]>;
  @Select(state => state.app.playedCreatures) playedCreatures$: Observable<Creature[]>;
  @Select(state => state.app.counter) counter$: Observable<number[]>;

  public starships: Starship[];
  public creatures: Creature[];
  public playedStarships: Starship[];
  public playedCreatures: Creature[];
  public counter: number[];

  constructor() {
    this.starships$
      .pipe(distinctUntilChanged())
      .subscribe((starships: Starship[]) => this.starships = starships);

    this.creatures$
      .pipe(distinctUntilChanged())
      .subscribe((creatures: Creature[]) => this.creatures = creatures);

    this.playedStarships$
      .pipe(distinctUntilChanged())
      .subscribe((playedStarships: Starship[]) => this.playedStarships = playedStarships);

    this.playedCreatures$
      .pipe(distinctUntilChanged())
      .subscribe((playedCreatures: Creature[]) => this.playedCreatures = playedCreatures);

    this.counter$
      .pipe(distinctUntilChanged())
      .subscribe((counter: number[]) => this.counter = counter);
  }

}
