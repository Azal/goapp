import {Stone} from "./Stone";
import {Blackstone} from "./Blackstone";
import {Whitestone} from "./Whitestone";

export class StoneMaker {
  static makeNew(n: number): Stone {
    switch (n) {
      case 0:
        return new Stone();
      case 1:
        return new Blackstone();
      case 2:
        return new Whitestone();
      default:
        return new Stone();
    }
  }
}
