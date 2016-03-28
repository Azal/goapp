import {Component} from "angular2/core";
import {Board} from "../models/Board";

@Component({
  selector: "go-board",
  templateUrl: "dev/templates/board.html"
})

export class BoardComponent {
  board_style: string = "game";
  board_size: number = 19;
  board: Board = new Board("Go Board", this.board_size, this.board_style);
  boardIterator: number[] = this.board.getIterator();
  boardHoverPosition: [number, number] = [-1, -1];

  onCellClick(x, y) {
    this.board.playAt(x, y);
  }

  onCellHover(x, y) {
    this.boardHoverPosition = [x, y];
  }

  setStyle(style) {
    this.board.setStyle(style);
    this.board_style = style;
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
  }

  playExampleSequence() {
    this.board.playSequence([[16, 4], [4, 16], [17, 16], [3, 4], [6, 17], [8, 17], [15, 17], [6, 16], [14, 3], [17, 10]]);
  }
}
