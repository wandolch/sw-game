import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { GameplayService } from './gameplay.service';
import { AppStoreService } from './app.store.service';
import { AppState } from '../app.state';
import { SetStarships } from '../actions/set-starships.action';
import { starships } from '../../../testing/mocks/starships.mock';
import { Starship } from '../interfaces/starship.interface';
import { SetCreatures } from '../actions/set-creatures.action';
import { creatures } from '../../../testing/mocks/creatures.mock';
import { Creature } from '../interfaces/creature.interface';
import { CREATURE_COMPARABLE_ATTR, RESOURCES, STARSHIP_COMPARABLE_ATTR } from '../constants/common.constants';
import { SetPlayedCreatures } from '../actions/set-played-creatures.action';
import { SetPlayedStarships } from '../actions/set-played-starships.action';

describe('GameplayService', () => {
  let service: GameplayService;
  let store: Store;
  let appStore: AppStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GameplayService,
        AppStoreService
      ],
      imports: [NgxsModule.forRoot([AppState])]
    });

    service = TestBed.get(GameplayService);
    store = TestBed.get(Store);
    appStore = TestBed.get(AppStoreService);
  });

  describe('play method', () => {
    beforeEach(() => {
      store.dispatch(new SetStarships((starships as Starship[])));
      store.dispatch(new SetCreatures((creatures as Creature[])));
    });

    it('should set valid played starships to store', () => {
      service.play(RESOURCES.STARSHIPS);

      const [starship1, starship2] = appStore.playedStarships;
      expect(starship1.name).toBeDefined();
      expect(starship2.name).toBeDefined();
      if (starship1[STARSHIP_COMPARABLE_ATTR] !== starship2[STARSHIP_COMPARABLE_ATTR]) {
        expect(starship1.winner || starship2.winner);
      } else {
        expect(!starship1.winner && !starship2.winner);
      }
    });

    it('should set valid played creatures to store', () => {
      service.play(RESOURCES.STARSHIPS);

      const [creature1, creature2] = appStore.playedStarships;
      expect(creature1.name).toBeDefined();
      expect(creature2.name).toBeDefined();
      if (creature1[CREATURE_COMPARABLE_ATTR] !== creature2[CREATURE_COMPARABLE_ATTR]) {
        expect(creature1.winner || creature2.winner);
      } else {
        expect(!creature1.winner && !creature2.winner);
      }
    });
  });

  describe('clearPlayed method', () => {
    beforeEach(() => {
      store.dispatch(new SetPlayedStarships((starships.slice(0, 2) as Starship[])));
      store.dispatch(new SetPlayedCreatures((creatures.slice(0, 2) as Creature[])));
    });

    it('should reset played resources and counter', () => {
      service.clearPlayed();

      expect(appStore.playedStarships).toEqual([]);
      expect(appStore.playedCreatures).toEqual([]);
      expect(appStore.counter).toEqual([0, 0]);
    });
  });
});
