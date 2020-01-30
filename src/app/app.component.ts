import { Component, OnInit } from '@angular/core';
import { ResourcesService } from './services/resources.service';
import { RESOURCES } from './constants/common.constants';
import { GameplayService } from './services/gameplay.service';
import { AppStoreService } from './services/app.store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public resources = RESOURCES;
  public selectedResource = RESOURCES.STARSHIPS;

  constructor(public appStoreService: AppStoreService,
              private resourcesService: ResourcesService,
              private gameplayService: GameplayService) {
  }

  ngOnInit() {
    this.resourcesService.loadStarships();
  }

  public handleResourceChange(resource: string) {
    this.gameplayService.clearPlayed();
    this.resourcesService.loadResourseIfNotLoaded(resource);
  }

  public handlePlay() {
    this.gameplayService.play(this.selectedResource);
  }

  public isCurrentResourceAvailable(): boolean {
    return this.resourcesService.isResourceAvailable(this.selectedResource);
  }
}
