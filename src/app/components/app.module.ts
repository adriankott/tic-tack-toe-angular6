import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {TileComponent} from './common/tile/tile.component';
import {BoardComponent} from './common/board/board.component';
import {ActionsComponent} from './common/actions/actions.component';
import {GameManager} from '../services/game-manager.service';

const commonComponents = [
  TileComponent,
  BoardComponent,
  ActionsComponent
];


@NgModule({
  declarations: [
    AppComponent,
    ...commonComponents
  ],
  imports: [
    BrowserModule
  ],
  providers: [GameManager],
  bootstrap: [AppComponent]
})
export class AppModule { }
