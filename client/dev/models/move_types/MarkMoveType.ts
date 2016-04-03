import {MoveType} from "./MoveType"

export class MarkMoveType extends MoveType {
  allowStones() {
    return false;
  }
  allowMarkers() {
    return true;
  }
  allowPass() {
    return false;
  }
}
