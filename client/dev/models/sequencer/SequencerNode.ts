import {SequencerData} from "./SequencerData";
import {GenericNode} from "../../interfaces/GenericNode";
import {Keyable} from "../../interfaces/Keyable";
import {Printable} from "../../interfaces/Printable";
import {SequencerKey} from "./SequencerKey";

export class SequencerNode implements GenericNode<SequencerData, SequencerNode>, Keyable, Printable {
  _data: SequencerData;
  _parent: SequencerNode;
  _nodes: Object = {};
  protected _key: SequencerKey;

  constructor(data?: SequencerData) {
    if (data) {
      this._data = data;
      this._key = new SequencerKey(data.getKey());
    }
  }

  public set parent(parent: SequencerNode) {
    this._parent = parent;
  }

  public get parent(): SequencerNode {
    return this._parent;
  }

  public get data(): SequencerData {
    return this._data;
  }

  public set data(data: SequencerData) {
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
    return;
  }

  public addChild(child: SequencerNode): SequencerNode {
    let childTurn = child.getTurn();
    if (!this._data) {
      if (childTurn === 1) { // @TODO: First stone must be black
        this.copyNode(child);
        return this;
      } else {
        return null;
      }
    }
    let node = this._nodes[child.getNodeKey()];
    let childKey = child.getNodeKey();

    if (node && node.getKey() === childKey) {
      return node;
    } else {
      let turn = this.getTurn();

      // Node must be added as a child
      if (turn + 1 === childTurn) {
        // Color check: If stone color is the same, it's not possible to add node
        if (child.data.stone.getValue() === this.data.stone.getValue()) {
          console.log("Cannot put this stone for turn");
          return null;
        }
        this._nodes[childKey] = child;
        child.parent = this;
        return child;
      } else {
        for (let key in this._nodes) {
          let childNode = this._nodes[key];
          let result = childNode.addChild(child);
          if (result) {
            return result;
          }
        }
      }
    }
    return null;
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

  public searchChild(data: SequencerData): SequencerNode {
    if (this.getKey() === data.getKey()) {
      return this;
    }

    for (let key in this._nodes) {
      let node = this._nodes[key];
      let searchResult = node.searchChild(data);
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
    this._key = new SequencerKey(key);
    return;
  }

  public getTurn(): number {
    return this._data.turn;
  }

  public toString(): string {
    if (this._data) {
      let strNode = this._data.toString() + "<br/>[";
      for (let key in this._nodes) {
        let node = this._nodes[key];
        let str = node.getKey();
        strNode = strNode + node.toString();
      };
      return strNode + "]";
    } else {
      return "";
    }
  }

  print(): void {
    console.log(this.toString());
  }

}
