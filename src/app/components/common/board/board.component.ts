import {Component} from '@angular/core';
import {BoardModel} from '../../../core/models/BoardModel';
import {GameManager} from '../../../services/game-manager.service';


/*
* The boardModel component responsibility is
* just to arrange tiles based on the boardModel model width/ height
*/
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  public boardModel: BoardModel;

  constructor(private gameManager: GameManager) {
    this.boardModel = gameManager.boardModel;
  }

  isRunning(){
    return this.gameManager.isRunning() || this.gameManager.isOver();
  }

}
