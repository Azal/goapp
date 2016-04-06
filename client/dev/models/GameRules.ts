import {RuleTypeFactory} from './RuleTypeFactory';
import {RuleType} from './rule_types/RuleType';
import {Board} from './Board';
import {Cell} from './Cell';

export class GameRules {
  /* Game rules */
  private _handicap: number;
  private _main_time: number;        /* in minutes */
  private _byo_yomi_periods: number;
  private _byo_yomi_time: number;    /* in seconds */
  private _privacy: string;          /* ["open", "private"] */
  private _type: string;             /* ["free", "ranked"] */

  /* Extra data */
  private _board: Board;
  private _rule_type: RuleType;

  constructor(extra_game_rules, board: Board) {
    this._handicap = extra_game_rules["handicap"];
    this._main_time = extra_game_rules["main_time"];
    this._byo_yomi_periods = extra_game_rules["byo_yomi_periods"];
    this._byo_yomi_time = extra_game_rules["byo_yomi_time"];
    this._privacy = extra_game_rules["privacy"] || "open";
    this._type = extra_game_rules["style"] || "free";

    this._board = board;

    this._rule_type = RuleTypeFactory.makeNew(extra_game_rules["type"]);

    /* Overwriting Komi */
    if (extra_game_rules["komi"] !== undefined) {
      this._rule_type.setKomi(extra_game_rules["komi"]);
    }
  }

  /* Getters and Setters */
  public getKomi(): number {
    return this._rule_type.getKomi();
  }

  public setKomi(komi: number): void {
    this._rule_type.setKomi(komi);
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

  public getType(): string {
    return this._type;
  }

  /* Helpers */
  public isHandicapType(type: string): boolean {
    return this._rule_type.getHandicapType() === type;
  }

  /** Determine if a move of a 'color' stone is valid in (x, y) */
  public isValidMove(x: number, y: number, color: string): boolean {
    return this._rule_type.isValidMove(x, y, color, this._board);
  }

  /** Count a finished board position */
  public countBoard(): string {
    return this._rule_type.count(this._board);
  }
}
