import {Stone} from "./Stone";

export class Whitestone extends Stone {
  constructor() {
    super();
    this._innerValue = 2;
  }

  public toString(): string {
    return "whitestone:" + this._innerValue;
  }
}
