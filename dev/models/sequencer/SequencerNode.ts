import {SequencerData} from "./SequencerData";
import {GenericNode} from "../../interfaces/GenericNode";
import {Keyable} from "../../interfaces/Keyable";
import {Printable} from "../../interfaces/Printable";
import {SequencerKey} from "./SequencerKey";

export class SequencerNode implements GenericNode<SequencerData, SequencerNode>, Keyable, Printable {
  _data: SequencerData;
  _parent: SequencerNode;
  _nodes: SequencerNode[];
  protected _key: SequencerKey;

  constructor(data?: SequencerData) {
    this._data = data;
    this._key = new SequencerKey(data.getKey());
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
    if (!this._data) {
      this.copyNode(child);
      return this;
    }

    let node = this._nodes[child.getKey()];

    if (node) {
      return node;
    } else {
      let turn = this.getTurn();

      // Node must be added as a child
      if (this.getTurn() + 1 === child.getTurn()) {
        this._nodes[child.getKey()] = child;
        child.parent = this;
        return child;
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
    for (let node of this._nodes) {
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
    for (let node of this._nodes) {
      if (node.searchChild(key)) {
        return node;
      }
    }
    return null;
  }

  public getKey(): string {
    return this._key.toString();
  }

  public setKey(key: string): void {
    this._key = new SequencerKey(key);
    return;
  }

  public getTurn(): number {
    return this._data.turn;
  }

  // @TODO
  public toString(): string {
    if (this._data) {
      return this._data.toString();
    } else {
      return "";
    }
  }

  // @TODO
  print(): void {
  }
}
