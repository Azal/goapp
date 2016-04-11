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

  public _inSequence: boolean;
  public _mainBranch: boolean;
  public _isCurrent: boolean;
  private _deep: number;
  protected _key: Guid;
  private _lastChild: SequencerNode;

  public mainChild: SequencerNode;
  public next: SequencerNode;
  public previous: SequencerNode;

  constructor(data?: SequencerTreeData) {
    if (data) {
      this._data = data;
    }
    this._isCurrent = false;
    this._inSequence = false;
    this._mainBranch = false;
    this._deep = 0;
    this._key = Guid.MakeNew();
  }

  public get deep(): number {
    return this._deep;
  }

  public set deep(v: number) {
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

  public addElement(element: SequencerGroupElement): boolean {
    return false;
  }

  public addChild(child: SequencerNode): SequencerNode {
    if (!this._data) {
      this.copyNode(child);
      this._mainBranch = true;
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

      let brotherCount: number = 0;
      for (let key in this._nodes) {
        let node = this._nodes[key];
        brotherCount = brotherCount + 1;
      };

      // First child added to parent
      if (brotherCount === 1 ) {
        child.parent.mainChild = child;
        child._mainBranch = true;

      } else if (this._lastChild) {
        child.previous = this._lastChild;
        this._lastChild.next = child;
      }
      this._lastChild = child;

      return child;
    }
  }

  public removeChild(child: SequencerNode): boolean {
    let childNodeKey = child.getNodeKey();
    if (this._nodes[childNodeKey]) {

      this._nodes[childNodeKey].connectBrothers();
      this._nodes[childNodeKey].connectMainChild();

      this._nodes[childNodeKey] = null;
      delete(this._nodes[childNodeKey]);
      return true;
    } else {
      return false;
    }
  }

  public connectBrothers() {
    if (this.next && this.previous) {
      this.next.previous = this.previous;
      this.previous.next = this.next;
    }
  }

  public connectMainChild() {
    if (this.next && this.parent) {
      this.parent.mainChild = this.next;
    }
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
    let strNode: string = "";

    if (this._data) {
      if (this._inSequence) {
        let strNode = "[key: <b>" + this._key + "</b>][main: " + this._mainBranch + "][deep:" + this._deep + "][data: <b>" + this._data.toString() + "</b>]";
      } else {
        let strNode = "[key: " + this._key + "][main: " + this._mainBranch + "][deep:" + this._deep + "][data: " + this._data.toString() + "]";
      }
      if (this._isCurrent) {
        strNode = "<div class='current-node'>" + strNode + "</div>";
      }
      let childString = [];
      for (let key in this._nodes) {
        let node = this._nodes[key];
        childString.push(node.toString());
      }
      return strNode + "(" + childString.join(", ") + ")";
    } else {
      return "";
    }
  }

  print(): void {
    console.log(this.toString());
  }

  public removeSequenceMark() {
    this._inSequence = false;
  }

  public addSequenceMark() {
    this._inSequence = true;
  }

}
