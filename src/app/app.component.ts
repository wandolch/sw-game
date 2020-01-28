import { Component, OnInit } from '@angular/core';
import { ResourcesService } from './services/resources.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private resourcesService: ResourcesService) {
  }

  ngOnInit() {
    this.resourcesService.loadStarships();
  }
}
