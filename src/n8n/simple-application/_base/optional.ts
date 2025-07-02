type Defined<T> = {
    isEmpty: false;
    value: T;
}

type Empty = {
    isEmpty: true;
}

export type Optional<T> = Defined<T> | Empty;