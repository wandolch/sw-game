import { Component, OnInit } from '@angular/core';
import { ResourcesService } from './services/resources.service';
import { RESOURCES } from './constants/common.constants';
import { GameplayService } from './services/gameplay.service';
import { ResourcesStoreService } from './services/resources.store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public resources = RESOURCES;
  public selectedResource = RESOURCES.STARSHIPS;

  constructor(public resourcesStoreService: ResourcesStoreService,
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
    switch (this.selectedResource) {
      case RESOURCES.STARSHIPS:
        return Boolean(this.resourcesStoreService.starships && this.resourcesStoreService.starships.length);
      case RESOURCES.CREATURES:
        return Boolean(this.resourcesStoreService.creatures && this.resourcesStoreService.creatures.length);
      default:
        return false;
    }
  }
}
