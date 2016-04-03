import {MoveType} from "./MoveType"

export class MarkMoveType extends MoveType {
  public isAStone() {
    return false;
  }
  public isAMarker() {
    return true;
  }
  public isAPass() {
    return false;
  }
  public toString(): string {
    return "mark";
  }
}
