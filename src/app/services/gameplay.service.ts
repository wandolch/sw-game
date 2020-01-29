import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { CREATURE_COMPARABLE_ATTR, RESOURCES, STARSHIP_COMPARABLE_ATTR } from '../constants/common.constants';
import { Observable } from 'rxjs';
import { Starship } from '../interfaces/starship.interface';
import { Creature } from '../interfaces/creature.interface';
import { Playable } from '../interfaces/playable.interface';
import { SetPlayedStarships } from '../actions/set-played-starships.action';
import { SetPlayedCreatures } from '../actions/set-played-creatures.action';
import { AppStoreService } from './app.store.service';
import { ClearPlayed } from '../actions/clear-played.action';
import { IncreaseCounter } from '../actions/increase-counter.action';

/**
 * Gameplay related logic
 */
@Injectable({
  providedIn: 'root'
})
export class GameplayService {

  @Select(state => state.app.starships) starships: Observable<Starship[]>;
  @Select(state => state.app.creatures) creatures: Observable<Creature[]>;

  constructor(private store: Store,
              private appStoreService: AppStoreService) {
  }

  public play(resource: string) {
    switch (resource) {
      case RESOURCES.STARSHIPS:
        const starships = this.appStoreService.starships;
        const playedStarships = [this.cloneRandomResource(starships) as Starship, this.cloneRandomResource(starships) as Starship];
        this.findWinnerByAttribute(playedStarships, STARSHIP_COMPARABLE_ATTR);
        this.store.dispatch(new SetPlayedStarships(playedStarships));
        break;
      case RESOURCES.CREATURES:
        const creatures = this.appStoreService.creatures;
        const playedCreatures = [this.cloneRandomResource(creatures) as Creature, this.cloneRandomResource(creatures) as Creature];
        this.findWinnerByAttribute(playedCreatures, CREATURE_COMPARABLE_ATTR);
        this.store.dispatch(new SetPlayedCreatures(playedCreatures));
        break;
    }
  }

  public clearPlayed() {
    this.store.dispatch(new ClearPlayed());
  }

  private cloneRandomResource(arr: Playable[] = []): Playable {
    const resource = arr[Math.floor(Math.random() * arr.length)];
    return Object.assign({}, resource);
  }

  private findWinnerByAttribute([resource1, resource2]: Playable[], attr: string) {
    if (+resource1[attr] === +resource2[attr]) {
      return;
    }

    if (+resource1[attr] >= +resource2[attr]) {
      resource1.winner = true;
      this.store.dispatch(new IncreaseCounter(0));
    } else if (+resource2[attr] >= +resource1[attr]) {
      resource2.winner = true;
      this.store.dispatch(new IncreaseCounter(1));
    }
  }
}
