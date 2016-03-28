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

  public allElementsDefined(): boolean {
    return (this.currentX.length > 0) && (this.currentY.length > 0) && (this.currentStone.length > 0);
  }

  public sequenceKeyDefined(): boolean {
    return this.currentKey.length > 0;
  }

  public addGameSequence() {
    this.tree.addGameSequence(parseInt(this.currentX), parseInt(this.currentY), parseInt(this.currentStone));
  }

  public searchKey() {
    console.log(this.tree.searchChild(this.currentKey).toString());
  }
}
