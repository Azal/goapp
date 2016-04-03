import {Marker} from "./Marker"

export class SymbolMarker extends Marker {
  constructor(key: string) {
    super(key);
  }

  public isNotEmpty(): boolean {
    return true;
  }
}
