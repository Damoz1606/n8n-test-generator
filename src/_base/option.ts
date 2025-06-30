type Empty = {
  isEmpty: true;
};

type Defined<T> = {
  data: T;
  isEmpty: false;
};

export type Option<T> = Defined<T> | Empty;
export const isDefined = <T>(value: Option<T>): value is Defined<T> =>
  !value.isEmpty;
export const isEmpty = <T>(value: Option<T>): value is Empty => value.isEmpty;
