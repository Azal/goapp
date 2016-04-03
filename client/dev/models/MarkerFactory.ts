import {Marker} from "./markers/Marker";
import {LetterMarker} from "./markers/LetterMarker";
import {SymbolMarker} from "./markers/SymbolMarker";
import {PassMarker} from "./markers/PassMarker";

import {Blackstone} from "./markers/Blackstone";
import {Whitestone} from "./markers/Whitestone";

export class MarkerFactory {
  static makeNew(key: string): Marker {
    if (key.match("^.{1}_mark$")) {
      let matches: string[] = key.match("^(.{1})_mark$");
      // mark
      return new SymbolMarker(matches[1]);
    } else if (key.match("^([a-zA-Z]{1})_letter$")) {
      let matches: string[] = key.match("^([a-zA-Z]{1})_letter$");
      // letter
      return new LetterMarker(matches[1]);
    } else if (key == "white") {
      return new Whitestone();
    } else if (key == "black") {
      return new Blackstone();
    } else {
      return new PassMarker("pass");
    }
  }
}
