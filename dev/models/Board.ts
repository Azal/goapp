/* Board Logic and internal representation
/* The board saves:
/* 0: for empty cell,
/* 1: for black stone on cell,
/* 2: for white stone on cell
/**/
export class Board {
  private _name: string;
  private _id: number;
  private _current_turn: string;
  private _style: string; /* free or game */
  private _free_tool: string;
  private _size: number;
  private _moves: number;
  private _board: number[][];

  constructor(name: string, size?: number, style?: string) {
    this._name = name;
    this._id = Math.floor(Math.random() * 9999) + 1000;
    this._current_turn = "black";
    this._style = style || "game";
    this._free_tool = "";
    this._size = size || 19;
    this._moves = 0;
    this._board = [];

    let i: number, j: number;

    for (i = 0; i < size; ++i) {
      this._board[i] = [];

      for (j = 0; j < size; ++j) {
        this._board[i][j] = 0;
      }
    }
  }

  /** Getters and Setters */
    public getName(): string {
      return this._name;
    }

    public getID(): number {
      return this._id;
    }

    public getSize(): number {
      return this._size;
    }

    public getPosition(x: number, y: number): number {
      return this._board[x][y];
    }

    public getBoard(): number[][] {
      return this._board;
    }

    public getTurn(): string {
      return this._current_turn;
    }

    public getStyle(): string {
      return this._style;
    }

    public getTool(): string {
      return this._free_tool;
    }

    public getMoves(): number {
      return this._moves;
    }

    public setStyle(style: string): void {
      this._style = style;

      if (style === "free") {
        this._free_tool = "black_stone";
      } else {
        this._free_tool = "";
      }
    }

    public setTool(tool: string): void {
      this._free_tool = tool;
    }

    public getIterator(): number[] {
      return new Array(this._size);
    }

  /** Play a stone in the Board */
  public playAt(x: number, y: number): void {
    if (this._style === "free") {
      let actual_value: string = this.getTool();
      if (actual_value === "black_stone") {
        this._board[x][y] = 1;
        this._moves += 1;
      } else if (actual_value === "white_stone") {
        this._board[x][y] = 2;
        this._moves += 1;
      } else if (actual_value === "remove_stone") {
        this.removeFrom(x, y);
      } else {
        false;
      }
    } else if (this._style === "game" && this.getPosition(x, y) === 0) {
      if (this._current_turn === "black") {
        this._board[x][y] = 1;
        this._moves += 1;
        this._current_turn = "white";
      } else if (this._current_turn === "white") {
        this._board[x][y] = 2;
        this._moves += 1;
        this._current_turn = "black";
      } else {
        false;
      }
    }
  }

  /** ... */
  public hoverAt(x: number, y: number, color?: string): void {}

  /** ... */
  public markAt(x: number, y: number, color?: string): void {}

  /** Remove a stone from the Board */
  public removeFrom(x: number, y: number): void {
    this._board[x][y] = 0;
    this._moves -= 1;
  }

  /** Reset Board */
  public reset(): void {
    let i: number, j: number;

    for (i = 0; i < this._size; ++i) {
      for (j = 0; j < this._size; ++j) {
        this._board[i][j] = 0;
      }
    }

    this._current_turn = "black";
    this._free_tool = "";
    this._style = "game";
    this._moves = 0;
  }

  /** Play a sequence */
  public playSequence(moves: Array<[number, number]>): void {
    let i: number;
    let current_style: string = this._style;

    this.reset();
    this._style = "game";

    for (i = 0; i < moves.length; ++i) {
      this.playAt(moves[i][0] - 1, moves[i][1] - 1);
    }

    this._style = current_style;
  }

  /** Helpers */
    public isEmpty(x: number, y: number): boolean {
      return this.getPosition(x, y) === 0;
    }

    public isBlackTurn(): boolean {
      return this._current_turn === "black";
    }

    public isWhiteTurn(): boolean {
      return this._current_turn === "white";
    }

    public isGameStyleSetted(): boolean {
      return this._style === "game";
    }

    public isFreeStyleSetted(): boolean {
      return this._style === "free";
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

  /** Flip the color of all the stones of the Board */
  public changeColors(): void {
    let i: number, j: number;

    for (i = 0; i < this._size; ++i) {
      for (j = 0; j < this._size; ++j) {
        if (this._board[i][j] === 1) {
          this._board[i][j] = 2;
        } else if (this._board[i][j] === 2) {
          this._board[i][j] = 1;
        }
      }
    }
  }

  /** String representation of the Board */
  public toString(): string {
    let i: number, j: number;
    let str_board: string = "";

    for (i = 0; i < this._size; ++i) {
      for (j = 0; j < this._size; ++j) {
        str_board += this._board[j][i] + " | ";
      }

      str_board += "<br />";
    }

    return str_board;
  }
}
