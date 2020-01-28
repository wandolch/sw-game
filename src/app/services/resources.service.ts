import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { API_URLS } from '../constants/api.constants';
import { Starship } from '../interfaces/starship.interface';
import { ResourcesResponse } from '../interfaces/resources-response.interface';
import { DEFAULT_PAGE_SIZE } from '../constants/common.constants';
import { Creature } from '../interfaces/creature.interface';

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {

  constructor(private http: HttpClient) {
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
          });
        }
      });
  }

  private getRequestsArray(pagesLeft: number, apiUrl: string): Observable<ResourcesResponse>[] {
    const requests = [];
    for (let i = 0; i < pagesLeft; i++) {
      // starting from page 2
      requests.push(this.http.get(`${environment.baseUrl + apiUrl}?page=${i + 2}`));
    }
    return requests;
  }
}
