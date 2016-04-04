import {Stone} from "./Stone";

export class Whitestone extends Stone {
  constructor() {
    super();
    this._innerValue = 2;
  }

  public toString(): string {
    return "white";
  }

  public isNotEmpty(): boolean {
    return true;
  }
}
