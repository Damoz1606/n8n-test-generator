export type DomainEvent<T> = {
  name: string;
  payload: T;
};

export type Aggregate = {
  events: DomainEvent<unknown>[];
};

export const emitDomainEvent = <T extends Aggregate>(
  value: T,
  event: DomainEvent<unknown>,
) => ({
  ...value,
  events: [...value.events, event],
});
