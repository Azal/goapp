import {Marker} from "./Marker"

export class LetterMarker extends Marker{
  constructor(key: string) {
    super(key);
  }

  public isNotEmpty(): boolean {
    return true;
  }
}
