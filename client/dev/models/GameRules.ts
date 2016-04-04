/*
/* Game Rules
/*
/**/
import {Board} from './Board'
import {Cell} from './Cell'
import {RulesType} from './RulesType'

export class GameRules {
  /* Base rules */
  private _komi: number;
  private _handicap_type: string;
  private _handicap_score_adjusment: string;
  private _on_passing: string;
  private _self_capture: string;
  private _super_ko: string;
  private _ending_game: string;
  private _stone_removal: string;
  private _dame_filling_on_stone_removal: string;
  private _dame_negate_territory: string;
  private _player_after_stone_removal_phase: string;
  private _scoring: string;

  /* Extra rules */
  private _handicap: number;
  private _main_time: number; /* in minutes */
  private _byo_yomi_periods: number;
  private _byo_yomi_time: number; /* in seconds */
  private _privacy: string; /* open or private */
  private _style: string; /* free or ranked */

  /* Extra data */
  private _board: Board;
  private _seen_color_black: boolean;
  private _seen_color_white: boolean;

  constructor(board: Board, extra_game_rules) {
    this._importRules(extra_game_rules["type"]);

    /* Overwriting Komi */
    if (extra_game_rules["komi"] !== undefined) {
      this._komi = extra_game_rules["komi"];
    }

    this._handicap = extra_game_rules["handicap"];
    this._main_time = extra_game_rules["main_time"];
    this._byo_yomi_periods = extra_game_rules["byo_yomi_periods"];
    this._byo_yomi_time = extra_game_rules["byo_yomi_time"];
    this._privacy = extra_game_rules["privacy"] || "open";
    this._style = extra_game_rules["style"] || "free";

    this._board = board;
    this._seen_color_black = false;
    this._seen_color_white = false;
  }

  private _importRules(rule_type) {
    console.log("Importing " + rule_type + " rules...");
    var settings = RulesType.getDefaultRulesFor(rule_type);

    this._komi = settings["komi"];
    this._handicap_type = settings["handicap_type"];
    this._handicap_score_adjusment = settings["handicap_score_adjusment"];
    this._on_passing = settings["on_passing"];
    this._self_capture = settings["self_capture"];
    this._super_ko = settings["super_ko"];
    this._ending_game = settings["ending_game"];
    this._stone_removal = settings["stone_removal"];
    this._dame_filling_on_stone_removal = settings["dame_filling_on_stone_removal"];
    this._dame_negate_territory = settings["dame_negate_territory"];
    this._player_after_stone_removal_phase = settings["player_after_stone_removal_phase"];
    this._scoring = settings["scoring"];
  }

  /** Getters and Setters */
  public getKomi(): number {
    return this._komi;
  }

  public getHandicap(): number {
    return this._handicap;
  }

  public getMainTime(): number {
    return this._main_time;
  }

  public getByoYomiTime(): number {
    return this._byo_yomi_time;
  }

  public getByoYomiPeriods(): number {
    return this._byo_yomi_periods;
  }

  public getPrivacy(): string {
    return this._privacy;
  }

  public getStyle(): string {
    return this._style;
  }

  public setHandicap(handicap: number): void {
    this._handicap = handicap;
  }

  /* Determine if a move of a 'color' stone is valid in (x, y) */
  public isValidMove(x: number, y: number, color: string): boolean {
    var cell: Cell = this._board.getCell(x, y);
    var moveState: number = (color === "black") ? 1 : 2;
    cell.setValidatingStateFor(color);

    var neighborCells: Cell[] = this._board.getNeighborsOf(cell);
    var friendCells: Cell[] = neighborCells.filter(_cell => _cell.hasStoneState(moveState));
    var enemyCells: Cell[] = neighborCells.filter(_cell => !(_cell.isEmpty() || _cell.hasStoneState(moveState)));

    /* Check for possible ko situation */
    if (this._board.isPossibleKo(cell)) {
      cell.cleanValidationState();
      return false;
    }

    // if (this._board.isTherePossibleKo()) {
    //   if (this._board.getLastRemovedStone() === cell) {
    //     return false;
    //   } else {
    //     // this._board.cleanPossibleKo();
    //     // this._board.cleanLastRemovedStone();
    //   }
    // }

    if (0 < cell.getLiberties()) {
      cell.cleanValidationState();
      return true;
    }

    // if (enemyCells.length === 4) {
    //   return false;
    // }

    var tmp: boolean;
    var response: boolean = false;

    /* Removing enemy stones first! */
    for (var enemyCell of enemyCells) {
      tmp = this._board.removingStonesFrom(enemyCell);
      this._board.cleanAllMarkedToRemove();

      if (tmp) {
        cell.cleanValidationState();
        return true;
      }

      // response = response || tmp;
      // this._board.cleanAllMarkedToRemove();
    }

    /* Removing friendly stones */
    response = this._board.removingStonesFrom(cell);
    this._board.cleanAllMarkedToRemove();
    cell.cleanValidationState();

    return !response;
  }

  /* Count a finished board position */
  public countBoard(): string {
    var i: number, j: number;
    var player: string = "White";
    var result: number;
    var response: boolean;
    var blackPoints: number = 0;
    var whitePoints: number = 0;

    for (i = 0; i < this._board.getSize(); ++i) {
      for (j = 0; j < this._board.getSize(); ++j) {
        var cell: Cell = this._board.getBoard()[i][j];
        
        if (cell.isEmpty() && !cell.wasVisited()) {
          response = this.floodfill_2(cell);

          if (response) {
            var count: number = this._board.countAndCleanPoints();
            if (this._seen_color_black) {
              blackPoints += count;
            } else if (this._seen_color_white) {
              whitePoints += count;
            }
          } else {
            this._board.cleanPoints();
            /* To make dame search faster */
            // this.floodfill_1(cell);
          }
        }

        this._seen_color_black = false;
        this._seen_color_white = false;
      }
    }

    console.log("Counting details");
    console.log("Komi: " + this._komi);
    console.log("White points on board: " + whitePoints);
    console.log("Black points on board: " + blackPoints);
    console.log("Captured by White: " + this._board.getCapturedBlackStones());
    console.log("Captured by Black: " + this._board.getCapturedWhiteStones());
    console.log("Black captured on board: " + this._board.getCapturedBlackStonesOnBoard());
    console.log("White captured on board: " + this._board.getCapturedWhiteStonesOnBoard());

    result = whitePoints + this._board.getCapturedBlackStonesOnBoard() * 2 + this._board.getCapturedBlackStones() + this._komi
      - blackPoints - this._board.getCapturedWhiteStonesOnBoard() * 2 - this._board.getCapturedWhiteStones();

    if (result < 0) {
      result *= -1;
      player = "Black"
    }

    return player + " wins by " + result;
  }

  /* Floodfill implementation setted for finding dame points */
  public floodfill_1(cell: Cell): boolean {
    if (cell.isEmpty()) {
      var response: boolean = true;
      var neighborCells: Cell[] = this._board.getNeighborsOf(cell);

      cell.markAsDame();
      cell.visitForCounting();

      for (var emptyCell of neighborCells.filter(_cell => _cell.isEmpty() && !_cell.isMarkedAsCaptured())) {
        if (!emptyCell.isMarkedAsDame()) {
          response = response && this.floodfill_1(emptyCell);
        }
      }

      return response;
    } else {
      return false;
    }
  }

  /* Floodfill implementation setted counting territories */
  public floodfill_2(cell: Cell): boolean {
    if (cell.isEmpty()) {
      var response: boolean = true;
      var neighborCells: Cell[] = this._board.getNeighborsOf(cell);

      cell.markAsPoint();
      cell.visitForCounting();

      if (!this._seen_color_black && 0 < neighborCells.filter(_cell => _cell.hasBlackStone() && !_cell.isMarkedAsCaptured()).length) {
        this._seen_color_black = true;
      }

      if (!this._seen_color_white && 0 < neighborCells.filter(_cell => _cell.hasWhiteStone() && !_cell.isMarkedAsCaptured()).length) {
        this._seen_color_white = true;
      }

      /* Dame territory detected */
      if (this._seen_color_black && this._seen_color_white) {
        return false;
      }

      for (var emptyCell of neighborCells.filter(_cell => _cell.isEmpty() && !_cell.isMarkedAsCaptured())) {
        if (!emptyCell.isMarkedAsPoint()) {
          response = response && this.floodfill_2(emptyCell);
        }
      }

      return response;
    } else {
      return false;
    }
  }
}
