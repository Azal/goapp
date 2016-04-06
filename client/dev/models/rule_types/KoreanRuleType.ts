import {GameRules} from '../GameRules';
import {RuleType} from "./RuleType";
import {Board} from '../Board';

export class KoreanRuleType extends RuleType {
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

  public count(board: Board): string {
    return "TODO: Pending counting with: " + this.toString();
  }

  public isValidMove(x: number, y: number, color: string, board: Board): boolean {
    return true;
  }

  public toString(): string {
    return "Korean Rule";
  }
}
