import {Component} from "angular2/core";
import {SequencerTree} from "../models/sequencer/SequencerTree";
import {SequencerNode} from "../models/sequencer/SequencerNode";

@Component({
  selector: "go-sequence-tree",
  templateUrl: "dev/templates/sequencer.html"
})

export class SequenceTreeComponent {
  tree = new SequencerTree();
  currentX: string = "";
  currentY: string = "";

  moveType: string = "";
  markType: string =  "";

  currentKey: string = "";
  searchResult: string = "";

  currentNode: SequencerNode = null;

  public allElementsDefined(): boolean {
    return (this.currentX.length > 0) && (this.currentY.length > 0) && (this.moveType.length > 0);
  }

  public sequenceKeyDefined(): boolean {
    return this.currentKey.length > 0;
  }

  public addSequence() {
    let result = this.tree.addSequence(this.moveType, parseInt(this.currentX), parseInt(this.currentY), this.markType);
    if (result) {
      this.currentNode = this.tree.currentNode;
    }
  }

  public addSequenceGroupElement() {
    let result = this.tree.addSequenceGroupElement(this.moveType, parseInt(this.currentX), parseInt(this.currentY), this.markType);
    if (result) {
      this.currentNode = this.tree.currentNode;
    }
  }

  public seekAndAddSequence() {
    let result = this.tree.seekAndAddSequence(this.currentKey, this.moveType, parseInt(this.currentX), parseInt(this.currentY), this.markType);
    if (result) {
      this.currentNode = this.tree.currentNode;
    }
  }
  public seekAndAddSequenceGroupElement() {
    let result = this.tree.seekAndAddSequenceGroupElement(this.currentKey, this.moveType, parseInt(this.currentX), parseInt(this.currentY), this.markType);
    if (result) {
      this.currentNode = this.tree.currentNode;
    }
  }

  public removeGameSequence() {
    if (this.currentKey.length > 0) {
      this.tree.removeChild(this.currentKey);
    }
  }

  public currentNodeString() {
    if (this.currentNode) {
      return this.currentNode.toString();
    } else {
      return "";
    }
  }
}
