import {GlobalKey} from "../models/GlobalKey";

export interface GenericNode<T, G> {
  _data: T;
  _parent: G;
  _nodes: G[];

  addChild(child: G): G;
  removeChild(child: G): boolean;
}
