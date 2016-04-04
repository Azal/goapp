import {GenericTree} from "../../interfaces/GenericTree";
import {GenericNode} from "../../interfaces/GenericNode";
import {Printable} from "../../interfaces/Printable";
import {SequencerNode} from "./SequencerNode";
import {SequencerGroupNode} from "./SequencerGroupNode";
import {SequencerGroupElement} from "./SequencerGroupElement";
import {SequencerTreeData} from "./SequencerTreeData";
import {StoneMaker} from "../StoneMaker";

export class SequencerTree implements GenericTree<SequencerNode>, Printable {
  _head: SequencerNode;
  _currentNode: SequencerNode;
  _accessor: Object;
  private _turn: number;
  private _count: number;

  constructor() {
    this._head = new SequencerNode();
    this._currentNode = this._head;
    this._turn = 0;
    this._accessor = {};
    this._count = 0;
  }

  public getNodeCount(): number {
    return this._count;
  }

  public get currentNode(): SequencerNode {
    return this._currentNode;
  }

  /* BEGIN Interface methods */
  /**
   * Positionates current node due to it's key
   * @param {string} key [Represents unique game state]
   */
  public seekChild(key: string): SequencerNode {
    let node: SequencerNode = this.searchChild(key);
    if (node) {
      this._currentNode = node;
      this._turn = node.deep + 1;
      return node;
    }
    return null;
  }

  private increaseNodeCount(): void {
    this._count += 1;
  }

  public addChild(child: SequencerNode): SequencerNode {
    let node: SequencerNode = this._head.addChild(child);
    if (node) {
      this.increaseNodeCount();
      return node;
    } else {
      return null;
    }
  }

  public addChildFromCurrent(child: SequencerNode): SequencerNode {
    let node: SequencerNode = this._currentNode.addChild(child);
    if (node) {
      this.increaseNodeCount();
      return node;
    } else {
      return null;
    }
  }

  public removeChild(key: string): boolean {
    let node = this.searchChild(key);
    if (node) {
      if (node.parent) {
        return node.parent.removeChild(node);
      }
      delete(this._accessor[node.getKey()]);
    }
    return false;
  }

  public searchChild(key: string): SequencerNode {
    if (!this._accessor[key]) {
      return this._head.searchChild(key);
    } else {
      return this._accessor[key];
    }
  }

  toString(): string {
    if (this._head) {
      return "tree:<br/>" + this._head.toString();
    } else {
      return "";
    }
  }

  print(): void {
    console.log(this.toString());
  }

  /* END Interface methods */

  /* Begin Game Methods */
  public addSequence(moveType: string, x: number, y: number, markType: string): boolean {
    let treeData: SequencerTreeData = new SequencerTreeData(moveType, markType, x, y);
    if (!treeData.valid()) {
      console.log("Invalid Sequence Data");
      return false;
    }

    let node = new SequencerNode(treeData);
    let addedNode = this.addChildFromCurrent(node);

    if (addedNode) {
      this._currentNode = addedNode;
      this._turn = addedNode.deep + 1;
      this._accessor[addedNode.getKey()] = addedNode;
      return true;
    } else {
      return false;
    }
  }

  public addSequenceGroupElement(moveType: string, x: number, y: number, markType: string): boolean {
    let treeData: SequencerTreeData = new SequencerTreeData(moveType, markType, x, y);
    if (!treeData.valid()) {
      console.log("Invalid Sequence Data");
      return false;
    }

    if (this._currentNode.isGroup()) {
      return this._currentNode.addElement(new SequencerGroupElement(treeData));
    } else {
      let node: SequencerGroupNode = new SequencerGroupNode(treeData);
      let addedNode: SequencerNode = this.addChildFromCurrent(node);

      if (addedNode) {
        this._currentNode = addedNode;
        this._accessor[addedNode.getKey()] = addedNode;
        return true;
      } else {
        return false;
      }
    }
  }

  public seekAndAddSequence(key: string, moveType: string, x: number, y: number, markType: string): boolean {
    let seekResult = this.seekChild(key);
    if (!seekResult) {
      return false;
    }
    return this.addSequence(moveType, x, y, markType);
  }

  public seekAndAddSequenceGroupElement(key: string, moveType: string, x: number, y: number, markType: string): boolean {
    let seekResult = this.seekChild(key);
    if (!seekResult) {
      return false;
    }
    return this.addSequenceGroupElement(moveType, x, y, markType);
  }

  /* END Game Methods */
}
