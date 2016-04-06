import {GameRules} from '../GameRules';
import {RuleType} from "./RuleType";
import {Board} from '../Board';

export class ChineseRuleType extends RuleType {
  /* Base Japanese rules */
  komi: number = 7.5;
  handicap_type: string = "free";
  handicap_score_adjusment: string = "additional_point";
  on_passing: string = "none";
  self_capture: string = "no";
  super_ko: string = "forbidden";
  ending_game: string = "two_passes";
  stone_removal: string = "agreed";
  dame_filling_on_stone_removal: string = "no";
  dame_negate_territory: string = "no";
  player_after_stone_removal_phase: string = "last_pass";
  scoring: string = "area";

  public count(board: Board): string {
    return "TODO: Pending counting with: " + this.toString();
  }

  public isValidMove(x: number, y: number, color: string, board: Board): boolean {
    return true;
  }

  public toString(): string {
    return "Chinese Rule";
  }
}
