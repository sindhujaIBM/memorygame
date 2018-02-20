import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GameboardComponent } from './gameboard/gameboard.component';
import { LeftDivDirective } from './left-div.directive';
import { RightDivDirective } from './right-div.directive';

@NgModule({
  declarations: [
    AppComponent,
    GameboardComponent,
    LeftDivDirective,
    RightDivDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
