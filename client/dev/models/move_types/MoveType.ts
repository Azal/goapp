import {Printable} from "../../interfaces/Printable";

export class MoveType implements Printable{
  public isAStone(): boolean {
    return false;
  }
  public isAMarker(): boolean {
    return false;
  }
  public isAPass(): boolean {
    return false;
  }
  public print(): void {
    console.log(this.toString());
  }
  public toString(): string {
    return "";
  }
}
