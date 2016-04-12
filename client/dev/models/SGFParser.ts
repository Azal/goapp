import {SequencerTree} from "./sequencer/SequencerTree";
import {SequencerNode} from "./sequencer/SequencerNode";

export class SGFParser {
  private _sgf: string;
  private _current_index: number;
  private _root;
  private _sequencer_tree;

  private static COORDINATES: string = "abcdefghijklmnopqrs";
  private static NUMBERED_COORDINATES: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

  constructor(raw_sgf_string: string) {
    this._sgf = raw_sgf_string;
    this._current_index = 0;
    this._root = { _children: [] };
    this._sequencer_tree = new SequencerTree();
  }

  public parse() {
    this.parseTree(this._root);
    console.log(this._root);

    SGFParser.getSequencerTree(this._root, this._sequencer_tree);
    console.log(this._sequencer_tree);

    return this._sequencer_tree;
  }

  /* Actual parsing methods based on EidoGo */
  private parseTree(current_node) {
    while (this._current_index < this._sgf.length) {
      var currentChar: string = this.getCurrentChar();
      this._current_index++;

      switch (currentChar) {
        case ";":
          current_node = this.parseNode(current_node);
          break;
        case "(":
          this.parseTree(current_node);
          break;
        case ")":
          return;
      }
    }
  }

  private parseNode(current_node) {
    var node = { _children: [] };

    if (current_node) {
      current_node._children.push(node);
    } else {
      this._root = node;
    }

    node = this.parseProperties(node);

    return node;
  }

  private parseProperties(node) {
    var values = [];
    var key = "";
    var i = 0;

    while (this._current_index < this._sgf.length) {
      var c = this.getCurrentChar();

      if (c === ';' || c === '(' || c === ')') {
        break;
      }

      if (this.getCurrentChar() === '[') {
        while (this.getCurrentChar() === '[') {
          this._current_index++;
          values[i] = "";

          while (this.getCurrentChar() !== ']' && this._current_index < this._sgf.length) {
            if (this.getCurrentChar() === '\\') {
              this._current_index++;

              while (this.getCurrentChar() === "\r" || this.getCurrentChar() === "\n") {
                this._current_index++;
              }
            }

            values[i] += this.getCurrentChar();
            this._current_index++;
          }

          i++;

          while (this.getCurrentChar() === ']' || this.getCurrentChar() === "\n" || this.getCurrentChar() === "\r") {
            this._current_index++;
          }
        }

        if (node[key]) {
          if (!(node[key] instanceof Array)) {
            node[key] = [node[key]];
          }
          node[key] = node[key].concat(values);
        } else {
          node[key] = values.length > 1 ? values : values[0];
        }

        values = [];
        key = "";
        i = 0;

        continue;
      }

      if (c !== " " && c !== "\n" && c !== "\r" && c !== "\t") {
        key += c;
      }

      this._current_index++;
    }

    return node;
  }

  /* Tranlation to SequencerTree */
  public static getSequencerTree(node, tree): void {
    if (node == null || node._children[0] == null) {
      console.log("Finished!");
      return;
    }

    var last_key = tree.currentNode.key;

    for (var i = 0; i < node._children.length; i++) {
      var x, y, color;

      if (node._children[i].hasOwnProperty("B")) {

        x = SGFParser.translateCoordinate(node._children[i]["B"][0]);
        y = SGFParser.translateCoordinate(node._children[i]["B"][1]);
        color = "black";

      } else  if (node._children[i].hasOwnProperty("W")) {

        x = SGFParser.translateCoordinate(node._children[i]["W"][0]);
        y = SGFParser.translateCoordinate(node._children[i]["W"][1]);
        color = "white";
      }

      if (i == 0) {
        tree.addSequence("stone", x, y, color);
      } else {
        tree.seekAndAddSequence(last_key, "stone", x, y, color);
      }

      SGFParser.getSequencerTree(node._children[i], tree);
    }
  }

  public static getSequencerNode(): SequencerNode {
    return new SequencerNode();
  }

  public static translateCoordinates(node): void {
    if (node._children[0]["B"]) {
      node._children[0]["B_X"] = SGFParser.translateCoordinate(node._children[0]["B"][0]);
      node._children[0]["B_Y"] = SGFParser.translateCoordinate(node._children[0]["B"][1]);
    }

    if (node._children[0]["W"]) {
      node._children[0]["W_X"] = SGFParser.translateCoordinate(node._children[0]["W"][0]);
      node._children[0]["W_Y"] = SGFParser.translateCoordinate(node._children[0]["W"][1]);
    }

    if (node._children[0]._children[0]) {
      SGFParser.translateCoordinates(node._children[0]._children[0]);
    }
  }

  public static getSequence(node, result): void {
    var coords = [];

    if (node == null || node._children[0] == null) {
      console.log("Finished!");
      return;
    }

    if (node._children[0].B) {
      console.log("Seen B");
      coords.push(SGFParser.translateCoordinate(node._children[0]["B"][0]));
      coords.push(SGFParser.translateCoordinate(node._children[0]["B"][1]));
    }

    if (node._children[0]["W"]) {
      console.log("Seen W");
      coords.push(SGFParser.translateCoordinate(node._children[0]["W"][0]));
      coords.push(SGFParser.translateCoordinate(node._children[0]["W"][1]));
    }

    if (node._children[0]["B"] || node._children[0]["W"]) {
      result.push(coords);
    }

    SGFParser.getSequence(node._children[0]._children[0], result);
  }

  /* Helpers */
  private getCurrentChar(): string {
    return this._sgf.charAt(this._current_index);
  }

  private static translateCoordinate(coordinate: string): number {
    return SGFParser.NUMBERED_COORDINATES[SGFParser.COORDINATES.indexOf(coordinate)];
  }
}