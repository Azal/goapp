import {Component} from 'angular2/core';
import {Board} from '../models/Board'

@Component({
  selector: 'go-board',
  templateUrl: 'dev/templates/board.html'
})

export class BoardComponent {
  board_settings = {
    "name": "Go Board",
    "size": 19,
    "style": "game"
  }

  game_rules = {
    "type": "japanese",
    "handicap": 2,
    "main_time": 30,
    "byo_yomi_periods": 3,
    "byo_yomi_time": 30
  }

  board: Board = new Board(this.board_settings, this.game_rules);
  boardIterator: number[] = this.board.getIterator();
  boardHoverPosition: [number, number] = [-1, -1];
  showBoardRepresentation: boolean = false;
  countMessage: string = ""

  onCellClick(x, y) {
    if (this.board.isCountingModeSetted()) {
      if (this.board.getCell(x, y).hasStone()) {
        this.board.markAsCaptured(x, y, "x");
      } else {
        console.log("There isn't a stone here!");
      }
    } else {
      this.board.playAt(x, y);
    }
  }

  onPassTurn() {
    this.board.passTurn();
  }

  onCountBoard() {
    this.countMessage = this.board.getGameRules().countBoard();
  }

  onCellHover(x, y) {
    this.boardHoverPosition = [x, y];
  }

  setMode(mode) {
    this.board.setMode(mode);
  }

  setTool(tool) {
    this.board.setTool(tool);
  }

  changeColors() {
    this.board.changeColors();
  }

  resetBoard() {
    this.board.reset();
    this.boardHoverPosition = [0, 0];
    this.showBoardRepresentation = false;
    this.countMessage = "";
  }

  playExampleSequence() {
    var exampleSequence: [number, number][] = [[15, 3], [3, 3], [15, 15], [3, 15], [3, 9], [16, 8], [16, 6], [15, 12], [16, 10], [14, 15], [15, 14], [15, 16], [14, 14], [16, 16], [13, 15], [14, 16], [13, 14], [13, 16], [11, 15], [15, 10], [16, 11], [15, 9], [17, 13], [12, 9], [9, 3], [14, 6], [16, 4], [14, 2], [15, 2], [13, 4], [12, 2], [11, 4], [12, 3], [12, 4], [14, 3], [5, 2], [2, 13], [5, 16], [2, 5], [1, 3], [6, 2], [5, 3], [9, 5], [1, 15], [15, 7], [14, 7], [15, 8], [14, 8], [16, 9], [15, 5], [16, 5], [9, 4], [10, 4], [13, 3], [10, 3], [13, 2], [6, 3], [6, 4], [7, 4], [7, 5], [6, 5], [5, 4], [7, 6], [7, 3], [8, 5], [7, 2], [4, 6], [2, 11], [2, 14], [2, 15], [3, 11], [2, 10], [3, 10], [2, 12], [3, 12], [2, 9], [2, 8], [1, 8], [1, 7], [0, 9], [13, 10], [12, 10], [15, 11], [15, 6], [16, 7], [13, 11], [14, 10], [9, 9], [8, 1], [7, 1], [10, 8], [10, 9], [11, 8], [9, 11], [11, 11], [11, 12], [12, 12], [10, 11], [12, 11],
      [12, 13], [13, 12], [11, 3], [11, 2], [10, 5], [10, 1], [10, 6], [9, 8], [8, 8], [9, 7], [3, 13], [3, 14], [4, 13], [4, 14], [5, 13], [5, 14], [6, 13], [6, 14], [7, 13], [6, 16], [6, 17], [5, 17], [4, 17], [3, 8], [1, 13], [4, 16], [5, 18], [5, 15], [5, 17], [7, 14], [8, 14], [8, 15], [9, 14], [9, 15], [10, 14], [1, 14], [0, 14], [7, 16], [4, 15], [12, 17], [13, 17], [7, 9], [10, 15], [10, 16], [11, 16], [8, 17], [10, 17], [9, 16], [7, 10], [6, 10], [7, 11], [12, 16], [17, 15], [2, 4], [2, 3], [7, 8], [5, 10], [6, 9], [17, 14], [18, 13], [11, 14], [11, 17], [6, 11], [8, 9], [15, 1], [16, 1], [14, 1], [1, 4], [16, 0], [17, 1], [12, 1], [11, 1], [18, 14], [16, 14], [13, 13], [14, 13], [11, 10], [14, 11], [0, 4], [0, 5], [0, 3], [1, 12], [0, 13], [12, 14], [11, 13], [0, 7], [1, 11], [12, 0], [12, 7], [11, 7], [12, 6], [11, 6], [11, 5], [5, 5], [5, 9], [5, 8], [17, 0], [13, 18], [14, 18],
      [12, 18], [17, 17], [14, 9], [4, 4], [8, 2], [3, 5], [3, 6], [16, 2], [17, 2], [13, 1], [8, 3], [6, 1], [8, 10], [12, 8], [8, 11], [8, 12], [4, 9], [5, 11], [13, 9], [13, 8], [14, 4], [14, 5], [9, 6], [15, 4], [16, 3], [13, 0], [11, 0], [8, 0], [9, 0], [7, 0], [15, 0], [14, 0], [9, 10], [10, 10], [4, 12], [5, 12], [0, 8], [1, 9], [7, 18], [7, 17], [18, 1],
      [6, 18], [8, 18], [15, 0], [4, 5], [3, 4], [2, 6]];

    this.board.reset();
    this.board.playSequence("game", exampleSequence, "matrix_coords");
  }

  toggleBoardRepresentation() {
    this.showBoardRepresentation = ! this.showBoardRepresentation;
  }
}