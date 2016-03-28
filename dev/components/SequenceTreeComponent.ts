import {Component} from "angular2/core";
import {SequencerTree} from "../models/sequencer/SequencerTree";

@Component({
  selector: "go-sequence-tree",
  templateUrl: "dev/templates/sequencer.html"
})

export class SequenceTreeComponent {
  tree = new SequencerTree();
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
    let result = this.tree.addGameSequence(parseInt(this.currentX), parseInt(this.currentY), parseInt(this.currentStone));
    if (result) {
      let newStone = parseInt(this.currentStone);
      if (newStone === 1) {
        newStone = 2;
      } else {
        newStone = 1;
      }
      this.currentStone = "" + newStone;
    }
  }

  public addGameSequenceToCurrent() {
    let result = this.tree.addFreeGameSequence(this.currentKey, parseInt(this.currentX), parseInt(this.currentY), parseInt(this.currentStone));
    if (result) {
      let newStone = parseInt(this.currentStone);
      if (newStone === 1) {
        newStone = 2;
      } else {
        newStone = 1;
      }
      this.currentKey = this.tree.currentNode.getKey();
      this.currentStone = "" + newStone;
    }
  }

  public searchKey() {
    console.log("Searching by: " + this.currentKey);
    let result = this.tree.searchChild(this.currentKey);
    if (result) {
      console.log(result.data.toString());
      this.searchResult = result.toString();
    } else {
      this.searchResult = "";
    }
  }
}
