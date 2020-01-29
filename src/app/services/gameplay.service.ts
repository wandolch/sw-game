import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { CREATURE_COMPARABLE_ATTR, RESOURCES, STARSHIP_COMPARABLE_ATTR } from '../constants/common.constants';
import { Observable } from 'rxjs';
import { Starship } from '../interfaces/starship.interface';
import { Creature } from '../interfaces/creature.interface';
import { Playable } from '../interfaces/playable.interface';
import { SetPlayedStarships } from '../actions/set-played-starships.action';
import { SetPlayedCreatures } from '../actions/set-played-creatures.action';
import { ResourcesStoreService } from './resources.store.service';
import { ClearPlayed } from '../actions/clear-played.action';

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
              private resourcesStoreService: ResourcesStoreService) {
  }

  public play(resource: string) {
    switch (resource) {
      case RESOURCES.STARSHIPS:
        const starships = this.resourcesStoreService.starships;
        const playedStarships = [this.cloneRandomResource(starships) as Starship, this.cloneRandomResource(starships) as Starship];
        this.selectWinnerByAttribute(playedStarships, STARSHIP_COMPARABLE_ATTR);
        this.store.dispatch(new SetPlayedStarships(playedStarships));
        break;
      case RESOURCES.CREATURES:
        const creatures = this.resourcesStoreService.creatures;
        const playedCreatures = [this.cloneRandomResource(creatures) as Creature, this.cloneRandomResource(creatures) as Creature];
        this.selectWinnerByAttribute(playedCreatures, CREATURE_COMPARABLE_ATTR);
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

  private selectWinnerByAttribute([resource1, resource2]: Playable[], attr: string) {
    if (+resource1[attr] >= +resource2[attr]) {
      resource1.winner = true;
    }
    // if resources are equal then both are winners
    if (+resource2[attr] >= +resource1[attr]) {
      resource2.winner = true;
    }
  }
}
