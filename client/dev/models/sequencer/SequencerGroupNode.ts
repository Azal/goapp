import {SequencerTreeData} from "./SequencerTreeData";
import {SequencerNode} from "./SequencerNode";
import {SequencerGroupElement} from "./SequencerGroupElement"
//import {Keyable} from "../../interfaces/Keyable";
//import {Printable} from "../../interfaces/Printable";
//import {Guid} from "../Guid";

export class SequencerGroupNode extends SequencerNode {
  _elements: SequencerGroupElement[];

  constructor(data?: SequencerTreeData) {
    super(data);
  }

  public addElement(element: SequencerGroupElement): void {
    this._elements.push(element);
  }

  public toString(): string {
    let elements = []

    for (let key in this._elements) {
      let element = this._elements[key];
      elements.push(element.toString());
    };
    return "(group:" + elements.join(", ") + ")" + super.toString();
  }

  public isGroup(): boolean {
    return true;
  }
}
