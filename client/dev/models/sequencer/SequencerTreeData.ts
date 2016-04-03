import {MoveTypeFactory} from "../MoveTypeFactory";
import {MarkerFactory} from "../MarkerFactory";
import {Marker} from "../markers/Marker";
import {MoveType} from "../move_types/MoveType";
import {Keyable} from "../../interfaces/Keyable";
import {Printable} from "../../interfaces/Printable";

export class SequencerTreeData implements Keyable, Printable{
  private _moveType: string;
  private _markType: string;
  private _x: number;
  private _y: number;
  private _mark: Marker;
  private _move: MoveType;

  constructor(moveType: string, markType: string, x: number, y: number) {
    this._moveType = moveType;
    this._markType = markType;
    this._x = x;
    this._y = y;
    this._move = MoveTypeFactory.makeNew(moveType);
    this._mark = MarkerFactory.makeNew(markType);
  }

  public get moveType() : string {
    return this._moveType;
  }
  public set moveType(v : string) {
    this._moveType = v;
    this._move = MoveTypeFactory.makeNew(v);
  }

  public get markType() : string {
    return this._markType;
  }
  public set markType(v : string) {
    this._markType = v;
    this._mark = MarkerFactory.makeNew(v);
  }

  public get x() : number {
    return this._x;
  }
  public set x(v : number) {
    this._x = v;
  }

  public get y() : number {
    return this._y;
  }
  public set y(v : number) {
    this._y = v;
  }

  public getKey(): string {
    return "x:" + this._x + "|y:" + this._y;
  }

  public getNodeKey(): string {
    return this.getKey();
  }

  setKey(key: string): void {
    return;
  }

  public print(): void {
    console.log(this.toString());
  }

  public toString(): string {
    return "x:" + this._x + "|y:" + this._y + "|mark:" + this._mark.toString() + "|move:" + this._move.toString();
  }

  public valid(): boolean {
    return this._move.isAPass() && this._mark.isAPass() || this._move.isAStone() && this._mark.isAStone() || this._move.isAMarker() && this._mark.isNotEmpty();
  }
}
