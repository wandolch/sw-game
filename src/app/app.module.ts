import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule, MatProgressSpinnerModule, MatSelectModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
    BrowserAnimationsModule,
    FormsModule,
    MatCardModule,
    HttpClientModule,
    [NgxsModule.forRoot([AppState])],
    MatSelectModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
