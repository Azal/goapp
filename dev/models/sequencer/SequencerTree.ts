import {GenericTree} from "../../interfaces/GenericTree";
import {GenericNode} from "../../interfaces/GenericNode";
import {Printable} from "../../interfaces/Printable";
import {SequencerNode} from "./SequencerNode";
import {SequencerData} from "./SequencerData";
import {Stone} from "../Stone";

export class SequencerTree implements GenericTree<SequencerNode>, Printable {
  _head: SequencerNode;
  _currentNode: SequencerNode;

  constructor() {
    this._head = new SequencerNode();
    this._currentNode = this._head;
  }

  /* BEGIN Interface methods */
  /**
   * Positionates current node due to it's key
   * @param {string} key [Represents unique game state]
   */
  public seekChild(key: string): SequencerNode {
    let searchResult: SequencerNode = this.searchChild(key);
    if (searchResult) {
      let node: SequencerNode = searchResult;
      this._currentNode = node;
      return node;
    }
    return null;
  }

  public addChild(child: SequencerNode): SequencerNode {
    return this._head.addChild(child);
  }

  public addChildFromCurrent(child: SequencerNode): SequencerNode {
    return this._currentNode.addChild(child);
  }

  public removeChild(key: string): boolean {
    let node = this.searchChild(key);
    if (node) {
      return node.parent.removeChild(node);
    }
    return false;
  }

  public searchChild(key: string): SequencerNode {
    return this._head.searchChild(key);
  }

  // @TODO
  toString(): string {
    return "";
  }

  // @TODO
  print(): void {
  }

  /* END Interface methods */

  /* Begin Game Methods */
  /**
   * Add a game sequence, using currentNode reference (Must be seeked before for complex usage)
   * @param  {number}  x           [Represents x axis board position]
   * @param  {number}  y           [Represents y axis board position]
   * @param  {number}  stoneNumber [Stone representation played at given position]
   * @return {boolean}             [Returns true when it's posible to add sequence (can be duplicated)]
   */
  public addGameSequence(x: number, y: number, stoneNumber: number): boolean {
    let currentTurn: number = this._currentNode.getTurn();
    let stone: Stone = Stone.makeNew(stoneNumber);
    let data = new SequencerData(currentTurn, x, y, stone);
    let node = new SequencerNode(data);
    let addedNode = this.addChild(node);
    if (addedNode) {
      this._currentNode = addedNode;
      return true;
    } else {
      return false;
    }
  }
  /* END Game Methods */
}
