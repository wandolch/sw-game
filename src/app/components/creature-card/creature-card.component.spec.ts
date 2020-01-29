import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CreatureCardComponent } from './creature-card.component';

describe('CreatureCardComponent', () => {
  let component: CreatureCardComponent;
  let fixture: ComponentFixture<CreatureCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatureCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatureCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
