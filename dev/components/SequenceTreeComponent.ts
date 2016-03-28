import {Component} from "angular2/core";
import {SequencerTree} from "../models/sequencer/SequencerTree";

@Component({
  selector: "go-sequence-tree",
  templateUrl: "dev/templates/sequencer.html"
})

export class SequenceTreeComponent {
  tree = new SequencerTree();
  currentTurn: string = "";
  currentX: string = "";
  currentY: string = "";
  currentStone: string = "";
  currentKey: string = "";
  searchResult: string = "";

  public allElementsDefined(): boolean {
    return (this.currentX.length > 0) && (this.currentY.length > 0) && (this.currentStone.length > 0);
  }

  public sequenceKeyDefined(): boolean {
    return this.currentKey.length > 0;
  }

  public addGameSequence() {
    if (this.currentTurn.length > 0) {
      this.tree.addFreeGameSequence(parseInt(this.currentTurn), parseInt(this.currentX), parseInt(this.currentY), parseInt(this.currentStone));
    } else {
      this.tree.addGameSequence(parseInt(this.currentX), parseInt(this.currentY), parseInt(this.currentStone));
    }
  }

  public searchKey() {
    console.log("Searching by: " + this.currentKey);
    let result = this.tree.searchChild(this.currentKey);
    console.log(result);

    if (result) {
      this.searchResult = result.toString();
    } else {
      this.searchResult = "";
    }
  }
}
