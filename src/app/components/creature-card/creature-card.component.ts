import { Component, Input } from '@angular/core';
import { Creature } from '../../interfaces/creature.interface';

@Component({
  selector: 'app-creature-card',
  templateUrl: './creature-card.component.html',
  styleUrls: ['./creature-card.component.scss']
})
export class CreatureCardComponent {

  @Input() creature: Creature;
  constructor() {
  }

}
