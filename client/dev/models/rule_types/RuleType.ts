/*
/* Rule information for main types
/*
/* Reference: https://online-go.com/docs/go-rules-comparison-matrix
/*
/**/
import {Printable} from "../../interfaces/Printable";
import {GameRules} from '../GameRules';
import {Board} from '../Board';

export class RuleType implements Printable {
  /* Base rules with possible values */
  public komi: number;                             /* [6.5, 7.5] */
  public handicap_type: string;                    /* ["fixed", "free"] */
  public handicap_score_adjusment: string;         /* ["none", "additional_point"] */
  public on_passing: string;                       /* ["none", "gives_prisoner"] */
  public self_capture: string;                     /* ["yes", "no"] */
  public super_ko: string;                         /* ["forbidden", "allowed", "special"] */
  public ending_game: string;                      /* ["two_passes", "white_last_pass"] */
  public stone_removal: string;                    /* ["agreed", "special"] */
  public dame_filling_on_stone_removal: string;    /* ["no", "agreed", "alternating"] */
  public dame_negate_territory: string;            /* ["yes", "no"] */
  public player_after_stone_removal_phase: string; /* ["last_pass", "opponent_resuming_player"] */
  public scoring: string;                          /* ["territory", "area", "any"] */

  /* Getters and Setters */
  public getKomi(): number {
    return this.komi;
  }

  public setKomi(komi: number): void {
    this.komi = komi;
  }

  public getHandicapType(): string {
    return this.handicap_type;
  }

  public count(board: Board): string {
    return "It's a tie!";
  }

  public isValidMove(x: number, y: number, color: string, board: Board): boolean {
    return true;
  }

  public print(): void {
    console.log(this.toString());
  }

  public toString(): string {
    return "empty_rule";
  }
}
