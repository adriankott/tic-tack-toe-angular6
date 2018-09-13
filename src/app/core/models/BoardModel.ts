import {TileModel} from './TileModel';

export interface IBoardModel {
  board: TileModel[][];
  width: number;
  height: number;
}

export class BoardModel implements IBoardModel {

  private _board: TileModel[][];
  readonly height: number;
  readonly width: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.init();
  }


  private init() {
    this._board = [];
    for (let i = 0; i < this.width; i++) {
      this._board[i] = [];
      for (let j = 0; j < this.height; j++) {
        this.board[i][j] = new TileModel().init();
      }
    }
  }

  public reset(){
    this.init();
  }


  get board(): TileModel[][] {
    return this._board;
  }
}

