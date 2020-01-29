import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { environment } from '../../environments/environment';
import { API_URLS } from '../constants/api.constants';
import { Starship } from '../interfaces/starship.interface';
import { ResourcesResponse } from '../interfaces/resources-response.interface';
import { CREATURE_COMPARABLE_ATTR, DEFAULT_PAGE_SIZE, RESOURCES, STARSHIP_COMPARABLE_ATTR } from '../constants/common.constants';
import { Creature } from '../interfaces/creature.interface';
import { SetStarships } from '../actions/set-starships.action';
import { SetCreatures } from '../actions/set-creatures.action';
import { AppStoreService } from './app.store.service';

/**
 * Requests and data preparation related logic
 */
@Injectable({
  providedIn: 'root'
})
export class ResourcesService {

  constructor(private http: HttpClient,
              private appStoreService: AppStoreService,
              private store: Store) {
  }

  /**
   * It's impossible to request starships one by one on demand with SW API implementation:
   * some requests like /api/starships/1/ or /api/starships/20/ don't work.
   * So even if we know amount of starships we can't reach every item separately.
   *
   * Paging for /api/starships/ can't be turned off and 'size' doesn't work, so we request all pages to get all starships.
   */
  public loadStarships() {
    this.http.get(environment.baseUrl + API_URLS.starships)
      .subscribe((res: ResourcesResponse<Starship>) => {
        if (res.count > DEFAULT_PAGE_SIZE) {
          const pagesLeft = Math.ceil((res.count - DEFAULT_PAGE_SIZE) / DEFAULT_PAGE_SIZE);
          const requests = this.getRequestsArray(pagesLeft, API_URLS.starships);
          forkJoin(requests).subscribe((responses: ResourcesResponse<Starship>[]) => {
            const starships = [...res.results];
            responses.forEach((data: ResourcesResponse<Starship>) => starships.push(...data.results));
            this.store.dispatch(new SetStarships(this.filterInvalidByAttribute(starships, STARSHIP_COMPARABLE_ATTR)));
          });
        }
      });
  }

  /**
   * The same approach for creatures as for starships, cause API works same.
   */
  public loadCreatures() {
    this.http.get(environment.baseUrl + API_URLS.creatures)
      .subscribe((res: ResourcesResponse<Creature>) => {
        if (res.count > DEFAULT_PAGE_SIZE) {
          const pagesLeft = Math.ceil((res.count - DEFAULT_PAGE_SIZE) / DEFAULT_PAGE_SIZE);
          const requests = this.getRequestsArray(pagesLeft, API_URLS.creatures);
          forkJoin(requests).subscribe((responses: ResourcesResponse<Creature>[]) => {
            const creatures = [...res.results];
            responses.forEach((data: ResourcesResponse<Creature>) => creatures.push(...data.results));
            this.store.dispatch(new SetCreatures(this.filterInvalidByAttribute(creatures, CREATURE_COMPARABLE_ATTR)));
          });
        }
      });
  }

  public loadResourseIfNotLoaded(resource: string) {
    switch (resource) {
      case RESOURCES.STARSHIPS:
        if (!this.appStoreService.starships || !this.appStoreService.starships.length) {
          this.loadStarships();
        }
        break;
      case RESOURCES.CREATURES:
        if (!this.appStoreService.creatures || !this.appStoreService.creatures.length) {
          this.loadCreatures();
        }
        break;
    }
  }

  private getRequestsArray(pagesLeft: number, apiUrl: string): Observable<ResourcesResponse>[] {
    const requests = [];
    for (let i = 0; i < pagesLeft; i++) {
      // starting from page 2
      requests.push(this.http.get(`${environment.baseUrl + apiUrl}?page=${i + 2}`));
    }
    return requests;
  }

  private filterInvalidByAttribute<T>(arr: T[], attr: string) {
    return arr.filter( (item: T) => !isNaN(+item[attr]));
  }
}
