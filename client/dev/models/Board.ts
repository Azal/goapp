/*
/* Board Logic and internal representation
/*
/**/
import {Cell} from './Cell'
import {GameRules} from './GameRules'

export class Board {
  private _name: string;
  private _id: number;
  private _current_turn: string;
  private _mode: string; /* free, game or counting */
  private _free_tool: string; /* black_stone, white_stone or remove_stone */
  private _size: number;
  private _moves_count: number;
  private _group_id_count: number;
  private _board: Cell[][];
  private _game_rules: GameRules;
  private _followed_turn_passes: number;
  private _captured_black_stones: number;
  private _captured_white_stones: number;
  private _game_ended: boolean;
  private _possible_kos: Cell[];
  private _skip_ko_clean_up: boolean;
  private _black_captured_on_board: number;
  private _white_captured_on_board: number;
  private _extra_turns: number;

  constructor(board_settings, game_rules) {
    this._name = board_settings["name"];
    this._size = board_settings["size"] || 19;
    this._mode = board_settings["style"] || "game";
    this._free_tool = board_settings["tool"] || "black_stone";

    this._id = Math.floor(Math.random() * 9999) + 1000;
    this._current_turn = "black";
    this._moves_count = 0;
    this._board = [];
    this._followed_turn_passes = 0;
    this._group_id_count = 0;
    this._game_ended = false;
    this._captured_black_stones = 0;
    this._captured_white_stones = 0;
    this._possible_kos = [];
    this._skip_ko_clean_up = false;
    this._black_captured_on_board = 0;
    this._white_captured_on_board = 0;
    this._extra_turns = 0;

    var i: number, j: number;

    for (i = 0; i < this._size; ++i) {
      this._board[i] = [];

      for (j = 0; j < this._size; ++j) {
        this._board[i][j] = new Cell(i, j, this);
      }
    }

    /* Placing handicap stones or given extra turns. UPDATE LATER with real rules type! */
    if (game_rules["handicap"] > 0) {
      game_rules["komi"] = 0.5;
    }

    this._game_rules = new GameRules(this, game_rules);

    if (this._mode === "game") {
      if (1 < game_rules["handicap"] && game_rules["handicap"] <= 9) {
        if (game_rules["type"] === "japanese") {
          this.placeHandicapStones(game_rules["handicap"]);
          this._current_turn = "white";
        } else if (game_rules["type"] === "chinese") {
          this._extra_turns = game_rules["handicap"];
        }
      } else if (game_rules["handicap"] === 1) {
        game_rules["komi"] = 0.5;
      }
    }

    /* Displaying Board Object */
    console.log(this);
  }

  /** Getters and Setters */
  public getName(): string {
    return this._name;
  }

  public getId(): number {
    return this._id;
  }

  public getSize(): number {
    return this._size;
  }

  public getNextGroupId(): number {
    return this._group_id_count += 1;
  }

  public getGameRules(): GameRules {
    return this._game_rules;
  }

  public getBoard(): Cell[][] {
    return this._board;
  }

  public getCell(x: number, y: number): Cell {
    return this._board[x][y];
  }

  public getNeighborsOf(cell: Cell): Cell[] {
    var neighbors: Cell[] = cell.getNeighbors();
    var x: number = cell.getPosX(),
        y: number = cell.getPosY();
    
    if (neighbors.length === 0) {
      if (0 < x && x < 18) {
        if (0 < y && y < 18) {
          neighbors = [this.getCell(x - 1, y), this.getCell(x + 1, y), this.getCell(x, y - 1), this.getCell(x, y + 1)];
        } else if (y === 0) {
          neighbors = [this.getCell(x - 1, y), this.getCell(x + 1, y), this.getCell(x, y + 1)];
        } else { /* y === 18 */
          neighbors = [this.getCell(x - 1, y), this.getCell(x + 1, y), this.getCell(x, y - 1)];
        }
      } else if (x === 0) {
        if (0 < y && y < 18) {
          neighbors = [this.getCell(x + 1, y), this.getCell(x, y - 1), this.getCell(x, y + 1)];
        } else if (y === 0) {
          neighbors = [this.getCell(x + 1, y), this.getCell(x, y + 1)];
        } else { /* y === 18 */
          neighbors = [this.getCell(x + 1, y), this.getCell(x, y - 1)];
        }
      } else { /* x === 18 */
        if (0 < y && y < 18) {
          neighbors = [this.getCell(x - 1, y), this.getCell(x, y - 1), this.getCell(x, y + 1)];
        } else if (y === 0) {
          neighbors = [this.getCell(x - 1, y), this.getCell(x, y + 1)];
        } else { /* y === 18 */
          neighbors = [this.getCell(x - 1, y), this.getCell(x, y - 1)];
        }
      }

      cell.saveNeighbors(neighbors);
    }

    return neighbors;
  }

  public getCapturedBlackStones(): number {
    return this._captured_black_stones;
  }

  public getCapturedWhiteStones(): number {
    return this._captured_white_stones;
  }

  public getCapturedBlackStonesOnBoard(): number {
    return this._black_captured_on_board;
  }

  public getCapturedWhiteStonesOnBoard(): number {
    return this._white_captured_on_board;
  }

  public getMode(): string {
    return this._mode;
  }

  public getTool(): string {
    return this._free_tool;
  }

  public getMovesCount(): number {
    return this._moves_count;
  }

  public setMode(mode: string): void {
    this._mode = mode;
    this._free_tool = "black_stone";
  }

  public setTool(tool: string): void {
    this._free_tool = tool;
  }

  public getIterator(): number[] {
    return new Array(this._size);
  }

  public getFollowedTurnPasses(): number {
    return this._followed_turn_passes;
  }

  /** Logic for passes moves */
  public passTurn(): void {
    this._followed_turn_passes += 1;
    this._current_turn = (this._current_turn === "black") ? "white" : "black";

    /** TODO: End Game Instructions here! */
    if (this._followed_turn_passes === 2) {
      this._game_ended = true;
      this._mode = "counting"
    }
  }

  /** Place the handicap stones */
  public placeHandicapStones(handicap: number): void {
    console.log("Placing handicap stones...");

    switch (handicap) {
      case 2:
        this.playSequence("free", [[16, 4], [4, 16]]);
        break;
      case 3:
        this.playSequence("free", [[16, 4], [4, 16], [16, 16]]);
        break;
      case 4:
        this.playSequence("free", [[16, 4], [4, 16], [16, 16], [4, 4]]);
        break;
      case 5:
        this.playSequence("free", [[16, 4], [4, 16], [16, 16], [4, 4], [10, 10]]);
        break;
      case 6:
        this.playSequence("free", [[16, 4], [4, 16], [16, 16], [4, 4], [4, 10], [16, 10]]);
        break;
      case 7:
        this.playSequence("free", [[16, 4], [4, 16], [16, 16], [4, 4], [4, 10], [16, 10], [10, 10]]);
        break;
      case 8:
        this.playSequence("free", [[16, 4], [4, 16], [16, 16], [4, 4], [4, 10], [16, 10], [10, 4], [10, 16]]);
        break;
      case 9:
        this.playSequence("free", [[16, 4], [4, 16], [16, 16], [4, 4], [4, 10], [16, 10], [10, 4], [10, 16], [10, 10]]);
        break;
      default:
        break;
    }
  }

  /** Play a stone in the Board */
  public playAt(x: number, y: number): void {
    if (this._mode === "free") {
      var tool: string = this.getTool();
      var color: string = "";

      if (tool === "black_stone") {
        color = "black";
      } else if (tool === "white_stone") {
        color = "white";
      } else if (tool === "remove_stone") {
        this.removeFrom(x, y);
      } else {
        false;
      }

      if (color === "black" || color == "white") {
        if (this.getGameRules().isValidMove(x, y, color)) {
          this._board[x][y].playStone(color, this.getNextGroupId());
          this._moves_count += 1;
          this._possible_kos = [];
          this._followed_turn_passes = 0;
        } else {
          console.log("Invalid move at: (" + x + ", " + y + ") by a " + color + " stone!");
        }
      }
    } else if (this._mode === "game" && !this._game_ended && this._board[x][y].isEmpty()) {
      this._skip_ko_clean_up = false;

      if (this.getGameRules().isValidMove(x, y, this._current_turn)) {
        this._board[x][y].playStone(this._current_turn, this.getNextGroupId());
        this._moves_count += 1;
        this._followed_turn_passes = 0;

        if (!this._skip_ko_clean_up) {
          this._possible_kos = [];
        }

        if (this._extra_turns > 1) {
          this._extra_turns -= 1;
        } else {
          if (this._current_turn === "black") {
            this._current_turn = "white";
          } else if (this._current_turn === "white") {
            this._current_turn = "black";
          }
        }
      } else {
        console.log("Invalid move at: (" + x + ", " + y + ") by a " + this._current_turn + " stone!");
      }
    }
  }

  /** Check if there are possible Ko situations */
  public isPossibleKo(cell: Cell): boolean {
    return this._possible_kos.indexOf(cell) > -1;
  }

  /** Save new cell for possible Ko */
  public savePossibleKo(cell: Cell): void {
    this._possible_kos.push(cell);
    this._skip_ko_clean_up = true;
  }

  /** Mark a stone as captured at the end of the game */
  public markAsCaptured(x: number, y: number, mark: string): void {
    if (this._board[x][y].hasBlackStone()) {
      this._black_captured_on_board += 1;
    } else {
      this._white_captured_on_board += 1;
    }

    this._board[x][y].markAsCaptured(mark);
  }

  /** Floodfill implementation setted for removal of captured stones */
  public removingStonesFrom(cell: Cell): boolean {
    var response: boolean = true;

    cell.markToRemove();

    if (cell.getLiberties() === 0) {
      for (var friendCell of this.getNeighborsOf(cell).filter(_cell => _cell.hasSameColorWith(cell))) {
        if (! friendCell.isMarkedToRemove()) {
          response = response && this.removingStonesFrom(friendCell);
        }
      }

      return response;
    } else {
      return false;
    }
  }

  /** Remove a stone from the Board */
  public removeFrom(x: number, y: number): void {
    this._board[x][y].removeStone();
    this._moves_count -= 1;
  }

  /** Reset Board */
  public reset(): void {
    var i: number, j: number;

    for (i = 0; i < this._size; ++i) {
      for (j = 0; j < this._size; ++j) {
        this._board[i][j].reset();
      }
    }

    this._mode = "game";
    this._free_tool = "black_stone";
    this._current_turn = "black";
    this._moves_count = 0;
    this._group_id_count = 0;
    this._followed_turn_passes = 0;
    this._game_ended = false;
    this._captured_black_stones = 0;
    this._captured_white_stones = 0;
    this._possible_kos = [];
    this._skip_ko_clean_up = false;
    this._black_captured_on_board = 0;
    this._white_captured_on_board = 0;
  }

  /** Remove all marked stones */
  public removeAllMarkedToRemoveCells(): number {
    var i: number, j: number;
    var captured_black_stones: number = 0;
    var captured_white_stones: number = 0;

    for (i = 0; i < this._size; ++i) {
      for (j = 0; j < this._size; ++j) {
        if (this._board[i][j].isMarkedToRemove()) {
          if (this._board[i][j].hasBlackStone()) {
            captured_black_stones += 1;
          } else if (this._board[i][j].hasWhiteStone()) {
            captured_white_stones += 1;
          }

          this._board[i][j].removeStone();
        }
      }
    }

    this._captured_black_stones += captured_black_stones;
    this._captured_white_stones += captured_white_stones;

    return captured_black_stones + captured_white_stones;
  }

  /** Clean all marked stones from removal state */
  public cleanAllMarkedToRemove(): void {
    var i: number, j: number;

    for (i = 0; i < this._size; ++i) {
      for (j = 0; j < this._size; ++j) {
        this._board[i][j].unmarkToRemove();
      }
    }
  }

  /** Count and clean marked points */
  public countAndCleanPoints(): number {
    var i: number, j: number;
    var count: number = 0;

    for (i = 0; i < this._size; ++i) {
      for (j = 0; j < this._size; ++j) {
        if (this._board[i][j].isMarkedAsPoint()) {
          count += 1;
          this._board[i][j].reset();
        }
      }
    }

    return count;
  }

  /** Clean mark as points */
  public cleanPoints(): void {
    var i: number, j: number;

    for (i = 0; i < this._size; ++i) {
      for (j = 0; j < this._size; ++j) {
        if (this._board[i][j].isMarkedAsPoint()) {
          this._board[i][j].reset();
        }
      }
    }
  }

  /** Play a sequence with coords_style: board_coords or matrix_coords */
  public playSequence(style: string, moves: [number, number][], coords_style?: string): void {
    var i: number;
    var current_style: string = this._mode;
    var coords_style: string = coords_style || "board_coords"
    var coordsFix: number = (coords_style === "board_coords") ? 1: 0;

    this._mode = style;

    for (i = 0; i < moves.length; ++i) {
      this.playAt(moves[i][0] - coordsFix, moves[i][1] - coordsFix);
    }

    this._mode = current_style;
  }

  /** Helpers */
  public isEmpty(x: number, y: number): boolean {
    return this._board[x][y].isEmpty();
  }

  public isMarked(x: number, y: number): boolean {
    return this._board[x][y].isMarkedAsCaptured();
  }

  public isBlackTurn(): boolean {
    return this._current_turn === "black";
  }

  public isWhiteTurn(): boolean {
    return this._current_turn === "white";
  }

  public isGameEnded(): boolean {
    return this._game_ended;
  }

  public isGameModeSetted(): boolean {
    return this._mode === "game";
  }

  public isFreeModeSetted(): boolean {
    return this._mode === "free";
  }

  public isCountingModeSetted(): boolean {
    return this._mode === "counting";
  }

  public isBlackStoneToolSetted(): boolean {
    return this._free_tool === "black_stone";
  }

  public isWhiteStoneToolSetted(): boolean {
    return this._free_tool === "white_stone";
  }

  public isRemoveStoneToolSetted(): boolean {
    return this._free_tool === "remove_stone";
  }

  public hasGameEnded(): boolean {
    return this._game_ended;
  }

  /** For future use: Get group of stones with id */
  public getAllCellsWithId(id: number): Cell[] {
    var cells: Cell[] = [];
    var i: number, j: number;

    for (i = 0; i < this._size; ++i) {
      for (j = 0; j < this._size; ++j) {
        if (this._board[i][j].getGroupId() === id) {
          cells.push(this._board[i][j]);
        }
      }
    }

    return cells;
  }

  /** For future use: Update group of stones with id for new_id */
  public setAllCellsWithIdTo(id: number, new_id: number): void {
    var i: number, j: number;

    for (i = 0; i < this._size; ++i) {
      for (j = 0; j < this._size; ++j) {
        if (this._board[i][j].getGroupId() === id) {
          this._board[i][j].setGroupId(new_id);
        }
      }
    }
  }

  /** For future use: Update group of stones liberties */
  public setAllCellsWithIdToLiberties(id: number, new_amount: number): void {
    var i: number, j: number;

    for (i = 0; i < this._size; ++i) {
      for (j = 0; j < this._size; ++j) {
        if (this._board[i][j].getGroupId() === id) {
          this._board[i][j].setLiberties(new_amount);
        }
      }
    }
  }

  /** Just for fun: Flip the color of all the stones of the Board */
  public changeColors(): void {
    var i: number, j: number;

    for (i = 0; i < this._size; ++i) {
      for (j = 0; j < this._size; ++j) {
        this._board[i][j].changeColor();
      }
    }
  }

  /** String representation of the Board */
  public toString(): string {
    var i: number, j: number;
    var str_board: string = "";

    for (i = 0; i < this._size; ++i) {
      for (j = 0; j < this._size; ++j) {
        str_board += "<span class='board_cell'>" + this._board[j][i].toString() + "</span>";
      }

      if (i !== this._size - 1) {
        str_board += "<br />";
      }
    } 

    return str_board;
  }
}
