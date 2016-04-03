import {MoveType} from "./MoveType"

export class StoneMoveType extends MoveType {
  allowStones() {
    return true;
  }
  allowMarkers() {
    return false;
  }
  allowPass() {
    return true;
  }
}