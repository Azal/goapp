import {Marker} from "./Marker";

export class PassMarker extends Marker {
  constructor(key: string) {
    super(key);
  }

  public isAPass(): boolean {
    return true;
  }
}
