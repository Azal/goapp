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
    this.reset();
  }

  private reset(): void {
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

  public removeChild(key: string): SequencerNode {
    let node = this.searchChild(key);
    if (node) {
      delete(this._accessor[node.getKey()]);
      if (node.parent) {
        node.parent.removeChild(node);

        if (node.getKey() === this._currentNode.getKey()) {
          this._currentNode = node.parent;
        }

        let nodeIterator: SequencerNode = this._currentNode;
        let nodeOnRoad: boolean = false;

        while (nodeIterator) {
          if (nodeIterator.getKey() === key) {
            nodeIterator = nodeIterator.parent;
            nodeOnRoad = true;
            break;
          } else {
            nodeIterator = nodeIterator.parent;
          }
        }

        if (nodeOnRoad && nodeIterator) {
          this._currentNode = nodeIterator;
        }

       } else {
        this.reset();
      }
    }
    return this._currentNode;
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
  public addPassSequence(): SequencerNode {
    return this.addSequence("pass", -1, -1, "");
  }

  public addSequence(moveType: string, x: number, y: number, markType: string): SequencerNode {
    let treeData: SequencerTreeData = new SequencerTreeData(moveType, markType, x, y);
    if (!treeData.valid()) {
      console.log("Invalid Sequence Data");
      return null;
    }

    let node = new SequencerNode(treeData);
    let addedNode = this.addChildFromCurrent(node);

    if (addedNode) {
      this._currentNode = addedNode;
      this._turn = addedNode.deep + 1;
      this._accessor[addedNode.getKey()] = addedNode;
    } else {
      console.log("Node not added");
      return null;
    }
    return this._currentNode;
  }

  public addSequenceGroupElement(moveType: string, x: number, y: number, markType: string): SequencerNode {
    let treeData: SequencerTreeData = new SequencerTreeData(moveType, markType, x, y);
    if (!treeData.valid()) {
      console.log("Invalid Sequence Data");
      return null;
    }

    if (this._currentNode.isGroup()) {
      this._currentNode.addElement(new SequencerGroupElement(treeData));
    } else {
      let node: SequencerGroupNode = new SequencerGroupNode(treeData);
      let addedNode: SequencerNode = this.addChildFromCurrent(node);

      if (addedNode) {
        this._currentNode = addedNode;
        this._accessor[addedNode.getKey()] = addedNode;
      } else {
        console.log("Node not added");
        return null;
      }
      return this._currentNode;
    }
  }

  public seekAndAddSequence(key: string, moveType: string, x: number, y: number, markType: string): SequencerNode {
    let seekResult = this.seekChild(key);
    if (!seekResult) {
      return null;
    }
    return this.addSequence(moveType, x, y, markType);
  }

  public seekAndAddSequenceGroupElement(key: string, moveType: string, x: number, y: number, markType: string): SequencerNode {
    let seekResult = this.seekChild(key);
    if (!seekResult) {
      return null;
    }
    return this.addSequenceGroupElement(moveType, x, y, markType);
  }

  /* END Game Methods */
}
