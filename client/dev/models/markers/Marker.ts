import {Printable} from "../../interfaces/Printable";

export class Marker implements Printable {
  protected _key: string;

  constructor(key: string) {
    this._key = key;
  }

  public print(): void {
    console.log(this.toString());
  }

  public toString(): string {
    return this._key;
  }

  public isAStone(): boolean {
    return false;
  }

  public isAMarker(): boolean {
    return true;
  }

  public isNotEmpty(): boolean {
    return false;
  }

  public isAPass(): boolean {
    return false;
  }
}
