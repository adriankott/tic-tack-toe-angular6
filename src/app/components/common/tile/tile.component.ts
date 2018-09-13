import {Component, Input} from '@angular/core';
import {TileModel} from '../../../core/models/TileModel';
import {Players, TileSelection} from '../../../core/enums';
import {GameManager} from '../../../services/game-manager.service';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent {

  public  model : TileModel;
  private _position: {i:number, j:number};
  constructor(private gameManager: GameManager) {
  }

  @Input()
  set position(value: {i:number, j:number}){
    this.model = this.gameManager.getAt(value);
    this._position = value;
  }

  setSelection() {
    this.gameManager.setSelection(this._position);
  }

  isValidText() {
    return this.model.selection !== TileSelection.nothing;
  }

  isOver(){
    return this.gameManager.isOver();
  }
}


