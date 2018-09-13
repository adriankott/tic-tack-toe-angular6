import {TileSelection} from '../enums';

export interface ITileModel {
  selection: TileSelection;
  isVictoryTile: boolean;
}

export class TileModel implements ITileModel {
  private _selection: TileSelection;
  private _isVictoryTile: boolean;

  get selection(): TileSelection {
    return this._selection;
  }

  set selection(value: TileSelection) {
    this._selection = value;
  }


  get isVictoryTile(): boolean {
    return this._isVictoryTile;
  }

  set isVictoryTile(value: boolean) {
    this._isVictoryTile = value;
  }

  init () {
    this.selection = TileSelection.nothing;
    return this;
  }

}

