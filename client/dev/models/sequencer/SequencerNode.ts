import {SequencerTreeData} from "./SequencerTreeData";
import {SequencerGroupElement} from "./SequencerGroupElement";
import {GenericNode} from "../../interfaces/GenericNode";
import {Keyable} from "../../interfaces/Keyable";
import {Printable} from "../../interfaces/Printable";
import {Guid} from "../Guid";

export class SequencerNode implements GenericNode<SequencerTreeData, SequencerNode>, Keyable, Printable {
  _data: SequencerTreeData;
  _parent: SequencerNode;
  _nodes: Object = {};
  private _deep: number;
  protected _key: Guid;

  constructor(data?: SequencerTreeData) {
    if (data) {
      this._data = data;
    }
    this._deep = 0;
    this._key = Guid.MakeNew();
  }

  public get deep() : number {
    return this._deep;
  }

  public set deep(v : number) {
    this._deep = v;
  }

  public isGroup(): boolean {
    return false;
  }

  public set parent(parent: SequencerNode) {
    this._parent = parent;
  }

  public get parent(): SequencerNode {
    return this._parent;
  }

  public get data(): SequencerTreeData {
    return this._data;
  }

  public set data(data: SequencerTreeData) {
    this._data = data;
  }

  public get nodes() {
    return this._nodes;
  }

  public get key() {
    return this._key;
  }

  public copyNode(node: SequencerNode): void {
    this._data = node.data;
    this._parent = node.parent;
    this._nodes = node.nodes;
    this._key = node.key;
    this._deep = node.deep;
    return;
  }

  public addElement(element: SequencerGroupElement): void {
    return;
  }

  public addChild(child: SequencerNode): SequencerNode {
    if (!this._data) {
      this.copyNode(child);
      return this;
    }
    let childKey = child.getNodeKey();
    let node = this._nodes[childKey];

    // Already added board position
    if (node) {
      console.log("Cannot put this child on " + this.getKey());
      return null;
    } else {
      this._nodes[childKey] = child;
      child.parent = this;
      child.deep = this.deep + 1;
      return child;
    }
  }

  public removeChild(child: SequencerNode): boolean {
    let childNodeKey = child.getNodeKey();
    if (this._nodes[childNodeKey]) {
      let node = this._nodes[childNodeKey];
      node.parent = undefined;
      this._nodes[childNodeKey] = undefined;
      return true;
    }
    for (let key in this._nodes) {
      let node = this._nodes[key];
      if (node.removeChild(child)) {
        return true;
      }
    }
    return false;
  }

  public searchChild(key: string): SequencerNode {
    if (this.getKey() === key) {
      return this;
    }

    for (let key in this._nodes) {
      let node = this._nodes[key];
      let searchResult = node.searchChild(key);
      if (searchResult) {
        return searchResult;
      }
    }
    return null;
  }

  public getKey(): string {
    if (this._key) {
      return this._key.toString();
    } else {
      return "";
    }
  }

  public getNodeKey(): string {
    if (this._key) {
      return "x:" + this._data.x + "|y:" + this._data.y;
    } else {
      throw new Error("Trying to get key from empty node");
    }
  }

  public setKey(key: string): void {
    this._key = new Guid(key);
    return;
  }

  public toString(): string {
    if (this._data) {
      let strNode = "[key: " + this.key + "] [data: " + this._data.toString() + "] <br/>";

      for (let key in this._nodes) {
        let node = this._nodes[key];
        let str = node.getKey();
        strNode = strNode + "( " + node.toString() + " )";
      };
      return strNode;
    } else {
      return "";
    }
  }

  print(): void {
    console.log(this.toString());
  }

}
