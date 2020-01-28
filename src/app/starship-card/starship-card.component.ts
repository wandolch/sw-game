import { Component, Input, OnInit } from '@angular/core';
import { Starship } from '../interfaces/starship.interface';

@Component({
  selector: 'app-starship-card',
  templateUrl: './starship-card.component.html',
  styleUrls: ['./starship-card.component.scss']
})
export class StarshipCardComponent implements OnInit {

  @Input() starShip: Starship;
  constructor() { }

  ngOnInit() {
  }

}
