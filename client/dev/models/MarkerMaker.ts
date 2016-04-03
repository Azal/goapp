import {Marker} from "./markers/Marker";
import {LetterMarker} from "./markers/LetterMarker";
import {SignMarker} from "./markers/SignMarker";

export class MarkerMaker {
  static makeNew(key: string): Marker {
    if (key.match("^.{1}_mark$")) {
      let matches: string[] = key.match("^(.{1})_mark$");
      // mark
      return new SignMarker(matches[1]);
    } else if (key.match("^([a-zA-Z]{1})_letter$")) {
      let matches: string[] = key.match("^([a-zA-Z]{1})_letter$");
      // letter
      return new LetterMarker(matches[1]);
    } else {
      return null;
    }
  }
}
