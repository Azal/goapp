export interface GenericTree<T>{
  _head: T;
  _currentNode: T;

  addChild(child: T): T;
  removeChild(key: string): T;
  seekChild(key: string): T;
  searchChild(key: string): T;
  addChildFromCurrent(child: T): T;
}
