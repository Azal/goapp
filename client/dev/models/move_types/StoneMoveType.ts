import {MoveType} from "./MoveType"

export class StoneMoveType extends MoveType {
  public isAStone() {
    return true;
  }
  public isAMarker() {
    return false;
  }
  public isAPass() {
    return false;
  }
  public toString(): string {
    return "stone";
  }
}