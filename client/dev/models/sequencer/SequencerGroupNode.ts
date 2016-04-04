import {SequencerTreeData} from "./SequencerTreeData";
import {SequencerNode} from "./SequencerNode";
import {SequencerGroupElement} from "./SequencerGroupElement"

export class SequencerGroupNode extends SequencerNode {
  _elements: Object = {};

  constructor(data?: SequencerTreeData) {
    super(data);
    this._elements[data.getKey()] = new SequencerGroupElement(data);
  }

  public addElement(element: SequencerGroupElement): boolean {
    if (this._elements[element.getKey()]) {
      console.log("Cannot add sequence to current group, already binded: " + element.getKey());
      return false;
    } else {
      this._elements[element.getKey()] = element;
      return true;
    }
  }

  public toString(): string {
    let elements = []

    for (let key in this._elements) {
      let element = this._elements[key];
      elements.push("[" + element.toString() + "]");
    };
    return "(group:" + elements.join(", ") + ")" + super.toString();
  }

  public isGroup(): boolean {
    return true;
  }
}
