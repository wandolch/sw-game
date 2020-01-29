import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule, MatSelectModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { StarshipCardComponent } from './components/starship-card/starship-card.component';
import { CreatureCardComponent } from './components/creature-card/creature-card.component';
import { AppState } from './app.state';

@NgModule({
  declarations: [
    AppComponent,
    StarshipCardComponent,
    CreatureCardComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    FormsModule,
    MatCardModule,
    HttpClientModule,
    [NgxsModule.forRoot([AppState])],
    MatSelectModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
