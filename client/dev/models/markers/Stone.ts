import {Printable} from "../../interfaces/Printable";
import {Marker} from "./Marker"

/* Board Logic and internal representation
/* The board saves:
/* 0: for empty cell,
/* 1: for black stone on cell,
/* 2: for white stone on cell
/**/
export class Stone extends Marker implements Printable {
  protected _innerValue: number;

  constructor() {
    super("");
    this._innerValue = 0;
  }

  public getValue(): number {
    return this._innerValue;
  }

  public toString(): string {
    return "stone:" + this._innerValue;
  }

  public print(): void {
    if (console) {
      console.log(this.toString());
    }
  }

  public isAStone(): boolean {
    return true;
  }

  public isAMarker(): boolean {
    return false;
  }
}
