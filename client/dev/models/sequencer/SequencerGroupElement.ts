import {SequencerTreeData} from "./SequencerTreeData";
import {Printable} from "../../interfaces/Printable";

export class SequencerGroupElement implements Printable {
  private _data: SequencerTreeData;

  constructor(data: SequencerTreeData) {
    this._data = data;
  }

  public print(): void {
    console.log(this.toString());
  }

  public toString(): string {
    return this._data.toString();
  }

  public getKey(): string {
    return this._data.getKey();
  }
}
