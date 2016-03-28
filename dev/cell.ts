/* Cell structure
/* The Cell save its state:
/* 0: for empty cell,
/* 1: for black stone on cell,
/* 2: for white stone on cell
/**/
import {Board} from './board'

export class Cell {
  private _x: number;
  private _y: number;
  private _state: number;
  private _playable: boolean;
  private _liberties: number;
  private _group_id: number;
  private _parent_board: Board;
  private _mark_to_remove: boolean;

  constructor(x: number, y: number, board: Board) {
    this._x = x;
    this._y = y;
    this._parent_board = board;
    this._state = 0;
    this._liberties = -1;
    this._group_id = 0;
    this._mark_to_remove = false;
  }

  /** Getters and Setters */
  public getPosX(): number {
    return this._x;
  }

  public getPosY(): number {
    return this._y;
  }

  public getLiberties(): number {
    // return this._liberties;

    if (this.isEmpty()) {
      return -1;
    } else {
      return this._parent_board.getCellNeighbors(this).filter(_cell => _cell.isEmpty()).length;
    }
  }

  public getGroupId(): number {
    return this._group_id;
  }

  public setLiberties(liberties: number): void {
    this._liberties = liberties;

    if (this._liberties === 0) {
      this.reset();
    }
  }

  public setGroupId(id: number): void {
    this._group_id = id;
  }

  public markToRemove(): void {
    this._mark_to_remove = true;
  }

  public unmarkToRemove(): void {
    this._mark_to_remove = false;
  }

  /** Helpers */
  public playStone(color: string, group_id: number): void {
    // console.log("Playing " + color + " stone at: " + this.toString("coods"));
    var board: Board = this._parent_board;

    /* Actual play */
    if (color === "black") {
      this._state = 1;
    } else if (color === "white") {
      this._state = 2;
    }
    this._group_id = group_id;

    var neighborCells: Cell[] = board.getCellNeighbors(this);
    var friendCells: Cell[] = neighborCells.filter(_cell => _cell.hasSameColorWith(this));
    var enemyCells: Cell[] = neighborCells.filter(_cell => !(_cell.isEmpty() || _cell.hasSameColorWith(this)));

    var defaultLiberties: number = neighborCells.length; /* It changes if it is a corner, border or center cell */
    var newLiberties: number = defaultLiberties - enemyCells.length;
    var visitedGroupsIds: number[] = [];
    var currentGroupId: number;
    var response: boolean;

    /* Removing enemy stones first! */
    for (var enemyCell of enemyCells) {
      response = board.floodfill(enemyCell);

      if (response) {
        board.removeAllMarkedToRemoveCells();
      } else {
        board.cleanAllMarkedToRemove();
      }
    }

    /* Removing friendly stones */
    response = board.floodfill(this);

    if (response) {
      board.removeAllMarkedToRemoveCells();
    } else {
      board.cleanAllMarkedToRemove();
    }

    /* Update liberties of friend neighbor groups */
    // for (var neighborCell of friendCells) {
    //   currentGroupId = neighborCell.getGroupId();

    //   if (visitedGroupsIds.indexOf(currentGroupId) > -1) {
    //     newLiberties -= 1;
    //   } else {
    //     newLiberties = neighborCell.getLiberties() + newLiberties - 2;

    //     /* Check shared liberties with the other stones of this neighbord group */
    //     var sharedAmount: number = this.shareLibertiesWithGroupById(neighborCell.getGroupId());
    //     if (sharedAmount > 0) {
    //       newLiberties -= sharedAmount;
    //     }

    //     /* Check shared liberties with already checked neighbors */
    //     for (var visitedCell of friendCells.filter(_cell => visitedGroupsIds.indexOf(_cell.getGroupId()) > -1)) {
    //       if (neighborCell.shareLibertiesWith(visitedCell)) {
    //         newLiberties -= 1;
    //       }
    //     }

    //     visitedGroupsIds.push(currentGroupId);
    //   }
    // }

    /* Update liberties of enemy neighbor groups */
    // visitedGroupsIds = [];
    // var groupsForRestore: Cell[] = [];
    // var restore: boolean;

    // for (var neighborCell of enemyCells) {
    //   currentGroupId = neighborCell.getGroupId();

    //   if (!(visitedGroupsIds.indexOf(currentGroupId) > -1)) {
    //     visitedGroupsIds.push(currentGroupId);

    //     if (neighborCell.getLiberties() - 1 === 0) {
    //       restore = true;
    //       groupsForRestore = board.getCellNeighbors(neighborCell);
    //     }

    //     board.setAllCellsWithIdToLiberties(currentGroupId, neighborCell.getLiberties() - 1);
    //   }
    // }

    /* Update groups information */
    for (var neighborCell of neighborCells) {
      if (this.hasSameColorWith(neighborCell) && neighborCell.getGroupId() !== group_id) {
        board.setAllCellsWithIdTo(neighborCell.getGroupId(), group_id);
      }
    }

    // board.setAllCellsWithIdToLiberties(this.getGroupId(), newLiberties);

    /* Restore liberties if necessary */
    // var restoreGroupsIds: number[] = [];

    // if (restore) {
    //   console.log(groupsForRestore);

    //   for (var cell of groupsForRestore) {
    //     if (!(restoreGroupsIds.indexOf(cell.getGroupId()) > -1)) {
    //       visitedGroupsIds.push(cell.getGroupId());

    //       board.setAllCellsWithIdToLiberties(cell.getGroupId(), cell.getLiberties() + 1);
    //     }
    //   }
    // }
  }

  public removeStone(): void {
    this._state = 0;
    this._liberties = -1;
    this._group_id = 0;
    this._mark_to_remove = false;
  }

  public changeColor(): void {
    if (this.hasBlackStone()) {
      this._state = 2;
    } else if (this.hasWhiteStone()) {
      this._state = 1;
    }
  }

  public blockCell(): void {
    this._playable = false;
  }

  public isPlayable(): boolean {
    return this._playable;
  }

  public isEmpty(): boolean {
    return this._state === 0;
  }

  public isMarkedToRemove(): boolean {
    return this._mark_to_remove === true;
  }

  public hasStone(): boolean {
    return this._state === 1 || this._state === 2;
  }

  public hasBlackStone(): boolean {
    return this._state === 1;
  }

  public hasWhiteStone(): boolean {
    return this._state === 2;
  }

  public hasSameColorWith(cell: Cell): boolean {
    if ((this.hasBlackStone() && cell.hasBlackStone()) || (this.hasWhiteStone() && cell.hasWhiteStone())) {
      return true;
    } else {
      return false;
    }
  }

  public shareLibertiesWith(cell: Cell): boolean {
    if (this._group_id !== cell._group_id && Math.abs(this._x - cell._x) === 1 && Math.abs(this._y - cell._y) === 1) {
      return true;
    } else {
      return false;
    }
  }

  public shareLibertiesWithGroupById(group_id: number): number {
    var cells: Cell[] = this._parent_board.getAllCellsWithId(group_id);
    var sharedAmount: number = 0;

    for (var cell of cells) {
      if (this.shareLibertiesWith(cell)) {
        sharedAmount += 1;
      }
    }

    return sharedAmount;
  }

  /** Reset Cell */
  public reset(): void {
    this._state = 0;
    this._liberties = -1;
    this._group_id = 0;
    this._mark_to_remove = false;
  }

  /** String representation of a Cell */
  public toString(style?: string): string {
    var string_style: string = style || "short";

    if (string_style === "coords") {
      return "(" + this._x + "," + this._y + ")";
    }

    if (string_style === "long") {
      return "(" + this._x + "," + this._y + ") '" + this._state + "' - '" +  this._liberties + "'";
    }

    if (string_style === "short") {
      return (this._mark_to_remove ? "R" : "-") + "," + this._group_id;
    }
  }
}
