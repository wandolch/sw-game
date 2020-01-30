import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { AppStoreService } from './app.store.service';
import { AppState } from '../app.state';
import { starships } from '../../../testing/mocks/starships.mock';
import { Starship } from '../interfaces/starship.interface';
import { ResourcesService } from './resources.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment.prod';
import { API_URLS } from '../constants/api.constants';
import { filter, first } from 'rxjs/operators';
import { Creature } from '../interfaces/creature.interface';
import { creatures } from '../../../testing/mocks/creatures.mock';

describe('ResourcesService', () => {
  let http: HttpTestingController;
  let service: ResourcesService;
  let store: Store;
  let appStore: AppStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ResourcesService,
        AppStoreService
      ],
      imports: [
        NgxsModule.forRoot([AppState]),
        HttpClientTestingModule]
    });

    http = TestBed.get(HttpTestingController);
    service = TestBed.get(ResourcesService);
    store = TestBed.get(Store);
    appStore = TestBed.get(AppStoreService);
  });

  afterEach(() => {
    http.verify();
  });

  describe('loadStarships method', () => {
    it('should request all starships and put it to store', fakeAsync(() => {
      service.loadStarships();
      appStore.starships$
        .pipe(
          first(),
          filter(data => Boolean(data && data.length))
        ).subscribe((data: Starship[]) => {
        expect(data).toEqual(starships as Starship[]);
      });

      const req1 = http.expectOne(environment.baseUrl + API_URLS.starships);
      expect(req1.request.method).toEqual('GET');
      req1.flush({
        count: 15,
        next: '',
        previous: '',
        results: starships.slice(0, 10)
      });

      tick();

      const req2 = http.expectOne(`${environment.baseUrl + API_URLS.starships}?page=2`);
      expect(req2.request.method).toEqual('GET');
      req2.flush({
        count: 15,
        next: '',
        previous: '',
        results: starships.slice(10, 15)
      });
    }));
  });

  describe('loadCreatures method', () => {
    it('should request all creatures and put them to store', fakeAsync(() => {
      service.loadCreatures();
      appStore.creatures$
        .pipe(
          first(),
          filter(data => Boolean(data && data.length))
        ).subscribe((data: Creature[]) => {
        expect(data).toEqual(creatures as Creature[]);
      });

      const req1 = http.expectOne(environment.baseUrl + API_URLS.creatures);
      expect(req1.request.method).toEqual('GET');
      req1.flush({
        count: 14,
        next: '',
        previous: '',
        results: creatures.slice(0, 10)
      });

      tick();

      const req2 = http.expectOne(`${environment.baseUrl + API_URLS.creatures}?page=2`);
      expect(req2.request.method).toEqual('GET');
      req2.flush({
        count: 14,
        next: '',
        previous: '',
        results: creatures.slice(10, 14)
      });
    }));
  });
});
