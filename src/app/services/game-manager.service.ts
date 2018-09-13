import {Injectable} from '@angular/core';
import {GameStatus, Players, TileSelection} from '../core/enums';
import {BoardModel} from '../core/models/BoardModel';
import {TileModel} from '../core/models/TileModel';

@Injectable()
export class GameManager {
  private _currentPlayer: Players;
  private _gameStatus: GameStatus;
  private _boardModel: BoardModel;
  private boardSize: number;
  private moveCount: number;
  public winner: TileSelection;

  constructor() {
    this.init();
  }

  private init() {
    this._currentPlayer = Players.one;
    this.boardSize = 3;
    this.moveCount = 0;
    this.winner = TileSelection.nothing;
    this.boardModel = new BoardModel(this.boardSize, this.boardSize);
  }

  get currentPlayer(): Players {
    return this._currentPlayer;
  }


  get gameStatus(): GameStatus {
    return this._gameStatus;
  }


  get boardModel(): BoardModel {
    return this._boardModel;
  }

  set boardModel(value: BoardModel) {
    this._boardModel = value;
  }

  private isTurnValid(position: { i: number, j: number }) {
    let tile = this.getAt(position);
    return this.isRunning() && tile.selection === TileSelection.nothing;
  }
  
  private setWinner(selection){
    this.winner = selection;
    this._gameStatus = GameStatus.over;
  }

  private checkState(position: { i: number, j: number }, selection: TileSelection) {
    this.moveCount++;
    //check col
    for (let i = 0; i < this.boardSize; i++) {
      if (this.getSelectionAtCoord(position.i, i) != selection) {
        break;
      }
      if (i == this.boardSize - 1) {
        //report win for s
        this.setWinner(selection)
      }
    }

    //check row
    for (let i = 0; i < this.boardSize; i++) {
      if (this.getSelectionAtCoord(i, position.j) != selection)
        break;
      if (i == this.boardSize - 1) {
        this.setWinner(selection)
      }
    }

    //check diagonal
    if (position.i == position.j) {
      //we're on a diagonal
      for (let i = 0; i < this.boardSize; i++) {
        if (this.getSelectionAtCoord(i, i) != selection)
          break;
        if (i == this.boardSize - 1) {
          this.setWinner(selection)
        }
      }
    }

    //check reverse diagonal
    if (position.i + position.j == this.boardSize - 1) {
      for (let i = 0; i < this.boardSize; i++) {
        if (this.getSelectionAtCoord(i,(this.boardSize - 1)- i) != selection)
          break;
        if (i == this.boardSize - 1) {
          this.setWinner(selection)
        }
      }
    }

    //check draw
    if (this.moveCount == (Math.pow(this.boardSize, 2))  && this.winner == TileSelection.nothing) {
      this.setWinner(TileSelection.nothing)
    }
  }

  public reset() {
    this.init();
  }

  public start() {
    this.init();
    this.stop();
    setTimeout(() => {
      this._gameStatus = GameStatus.running;
    });
  }

  public stop() {
    this.init();
    this._gameStatus = GameStatus.none;
  }

  public isRunning() {
    return this.gameStatus === GameStatus.running;
  }

  public isOver() {
    return this.gameStatus === GameStatus.over;
  }

  public nextTurn(position) {
    if (this._currentPlayer === Players.one) {
      this._currentPlayer = Players.two;
    } else {
      this._currentPlayer = Players.one;
    }
  }

  public getAt(value: { i: number, j: number }): TileModel {
    return this.boardModel.board[value.i][value.j];
  }

  public getAtCoord(i: number, j: number): TileModel {
    return this.getAt({i: i, j: j});
  }
  public getSelectionAtCoord(i: number, j: number): TileSelection {
    return this.getAt({i: i, j: j}).selection;
  }

  public setSelection(position: { i: number, j: number }) {
    let tile = this.getAt(position);
    if (!this.isTurnValid(position)) {
      return false;
    }
    tile.selection = this.currentPlayer === Players.one ? TileSelection.x : TileSelection.o;
    this.checkState(position, tile.selection);
    this.nextTurn(position);
  }


}
