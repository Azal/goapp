import {MoveType} from "./move_types/MoveType";
import {PassMoveType} from "./move_types/PassMoveType";
import {StoneMoveType} from "./move_types/StoneMoveType";
import {MarkMoveType} from "./move_types/MarkMoveType";

export class MoveTypeFactory {
  static makeNew(key: string): MoveType {
    switch (key) {
      case "pass":
        return new PassMoveType();
      case "stone":
        return new StoneMoveType();
      case "mark":
        return new MarkMoveType();
      default:
        return new MoveType();
    }
  }
}
