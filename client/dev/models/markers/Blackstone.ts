import {Stone} from "./Stone";

export class Blackstone extends Stone {
  constructor() {
    super();
    this._innerValue = 1;
  }

  public toString(): string {
    return "black";
  }

  public isNotEmpty(): boolean {
    return true;
  }
}
