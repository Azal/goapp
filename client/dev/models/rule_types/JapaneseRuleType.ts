import {GameRules} from '../GameRules';
import {RuleType} from "./RuleType";
import {Board} from '../Board';
import {Cell} from '../Cell';

export class JapaneseRuleType extends RuleType {
  /* Base Japanese rules */
  komi: number = 6.5;
  handicap_type: string = "fixed";
  handicap_score_adjusment: string = "none";
  on_passing: string = "none";
  self_capture: string = "no";
  super_ko: string = "allowed";
  ending_game: string = "two_passes";
  stone_removal: string = "special";
  dame_filling_on_stone_removal: string = "agreed";
  dame_negate_territory: string = "yes";
  player_after_stone_removal_phase: string = "opponent_resuming_player";
  scoring: string = "territory";

  constructor() {
    super();
  }

  public count(board: Board): string {
    var i: number, j: number; 
    var player: string = "White";
    var result: number;
    var response: boolean;
    var blackPoints: number = 0;
    var whitePoints: number = 0;

    for (i = 0; i < board.getSize(); ++i) {
      for (j = 0; j < board.getSize(); ++j) {
        var cell: Cell = board.getCell(i, j);

        if (cell.isEmpty() && !cell.wasVisited()) {
          response = board.countTerritoryFrom(cell);

          if (response) {
            var count: number = board.countAndCleanPoints();
            if (board.hasSeenColorBlack()) {
              blackPoints += count;
            } else if (board.hasSeenColorWhite()) {
              whitePoints += count;
            }
          } else {
            board.cleanPoints();
          }
        }

        board.setSeenColorBlack(false);
        board.setSeenColorWhite(false);
      }
    }

    result = whitePoints + board.getCapturedBlackStonesOnBoard() * 2 + board.getCapturedBlackStones() + this.getKomi()
      - blackPoints - board.getCapturedWhiteStonesOnBoard() * 2 - board.getCapturedWhiteStones();

    if (result < 0) {
      result *= -1;
      player = "Black"
    }

    console.log("Counting details");
    console.log("Komi: " + this.getKomi());
    console.log("White points on board: " + whitePoints);
    console.log("Black points on board: " + blackPoints);
    console.log("Captured by White: " + board.getCapturedBlackStones());
    console.log("Captured by Black: " + board.getCapturedWhiteStones());
    console.log("Black captured on board: " + board.getCapturedBlackStonesOnBoard());
    console.log("White captured on board: " + board.getCapturedWhiteStonesOnBoard());
    console.log(player + " wins by " + result);

    return player + " wins by " + result;
  }

  public isValidMove(x: number, y: number, color: string, board: Board): boolean {
    var moveState: number = (color === "black") ? 1 : 2;
    var cell: Cell = board.getCell(x, y);
    var response: boolean = false;

    cell.setValidatingStateFor(color);

    var neighborCells: Cell[] = board.getNeighborsOf(cell);
    var enemyCells: Cell[] = neighborCells.filter(_cell => !(_cell.isEmpty() || _cell.hasStoneState(moveState)));

    /* Check for possible ko situation */
    if (board.isPossibleKo(cell)) {
      cell.cleanValidationState();
      return false;
    }

    /* Check if cell has liberties */
    if (0 < cell.getLiberties()) {
      cell.cleanValidationState();
      return true;
    }

    /* Removing enemy stones first! */
    for (var enemyCell of enemyCells) {
      response = board.removeStonesFrom(enemyCell);
      board.cleanAllMarkedToRemove();

      if (response) {
        cell.cleanValidationState();
        return true;
      }
    }

    /* Removing friendly stones */
    response = board.removeStonesFrom(cell);
    board.cleanAllMarkedToRemove();
    cell.cleanValidationState();

    return !response;
  }

  public toString(): string {
    return "Japanese Rule";
  }
}
