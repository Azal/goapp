import {Printable} from "../../interfaces/Printable";
import {Keyable} from "../../interfaces/Keyable";
import {Stone} from "../Stone";

export class SequencerData implements Printable, Keyable {
  private _stone: Stone;
  private _x: number;
  private _y: number;
  private _turn: number;

  constructor(turn: number, x: number, y: number, stone: Stone) {
    this._stone = stone;
    this._x = x;
    this._y = y;
    this._turn = turn;
  }
  public get x(): number {
    return this._x;
  }
  public set x(x: number) {
    this._x = x;
  }
  public get y(): number {
    return this._y;
  }
  public set y(y: number) {
    this._y = y;
  }
  public get stone(): Stone {
    return this._stone;
  }
  public set stone(stone: Stone) {
    this._stone = stone;
  }
  public get turn(): number {
    return this._turn;
  }
  public set turn(turn: number) {
    this._turn = turn;
  }

  /* Printable methods */
  public toString(): string {
    return "turn:" + this._turn + "|x:" + this._x + "|y:" + this._y + "|stone:" + this._stone.toString();
  }
  public print(): void {
    return console.log(this.toString());
  }

  /* Keyable methods */
  getKey(): string {
    return toString();
  }
  setKey(key: string): void {
    // Check key format "turn:2|x:1|y:2|stone:1"
    if (key.match("/turn:\n+|x:\n+|y:\n+|stone:{1,2}/").length === 0) {
      throw new Error("Sequencer Data key invalid: " + key);
    }
    let elements: string[] = key.split("|");
    let turn: string[] = elements[0].split(":");
    let x: string[] = elements[1].split(":");
    let y: string[] = elements[2].split(":");
    let stone: string[] = elements[3].split(":");

    this._turn = parseInt(turn[1]);
    this._x = parseInt(x[1]);
    this._y = parseInt(y[1]);
    this._stone = Stone.makeNew(parseInt(stone[1]));
  }
}
