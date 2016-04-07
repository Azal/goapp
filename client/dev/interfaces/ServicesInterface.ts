export interface ServicesInterface<T> {
  index(): T[];
  show(): T;
  create(model: T);
  update(model: T);
  destroy(model: T);
}
