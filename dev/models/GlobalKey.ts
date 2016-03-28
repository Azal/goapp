export class GlobalKey {
  protected _guid: string;

  constructor(public guid: string) {
    this._guid = guid;
  }
  public toString(): string {
    return this.guid;
  }
  // Must be static member
  static MakeNew(): GlobalKey {
    return null;
  }
}