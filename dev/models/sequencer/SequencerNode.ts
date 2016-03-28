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
      if (childTurn === 1) {
        this.copyNode(child);
        return this;
      } else {
        return null;
      }
    }
    let node = this._nodes[child.getKey()];
    let childKey = child.getKey();

    if (node && node.getKey() === childKey) {
      return node;
    } else {
      let turn = this.getTurn();

      // Node must be added as a child
      if (turn + 1 === childTurn) {
        this._nodes[childKey] = child;
        child.parent = this;
        return child;
      } else {
        for (let key in this._nodes) {
          let childNode = this._nodes[key];
          if (childNode) {
            let result = childNode.addChild(child);
            if (result) {
              return result;
            }
          }
        }
      }
    }
    return null;
  }

  public removeChild(child: SequencerNode): boolean {
    if (this._nodes[child.getKey()]) {
      let node = this._nodes[child.getKey()];
      node.parent = undefined;
      this._nodes[child.getKey()] = undefined;
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
      if (node.searchChild(key)) {
        return node;
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
