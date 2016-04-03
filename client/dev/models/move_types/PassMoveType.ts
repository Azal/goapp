import {MoveType} from "./MoveType"

export class PassMoveType extends MoveType {
  allowStones() {
    return false;
  }
  allowMarkers() {
    return false;
  }
  allowPass() {
    return true;
  }
}