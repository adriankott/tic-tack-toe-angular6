import {Component, Input} from '@angular/core';
import {TileModel} from '../../../core/models/TileModel';
import {GameManager} from '../../../services/game-manager.service';
import {GameStatus, TileSelection} from '../../../core/enums';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent {
  constructor(private gameManager: GameManager) {

  }

  startGame(){
    this.gameManager.start();
  }

  getDefaultMessage(){
    return "Press start to start a new game ";
  }

  getWinner(){
    if(this.gameManager.winner === TileSelection.nothing){
      return "Game was a draw" + this.getDefaultMessage();
    }
    return `Game winner was player with ${this.gameManager.winner} ${this.getDefaultMessage()}`;
  }

  isOver(){
    return this.gameManager.isOver()
  }

}
