import {MoveType} from "./MoveType";

export class PassMoveType extends MoveType {
  public isAStone() {
    return false;
  }
  public isAMarker() {
    return false;
  }
  public isAPass() {
    return true;
  }
  public toString(): string {
    return "pass";
  }
}