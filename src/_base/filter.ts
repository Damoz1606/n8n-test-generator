export type FilterOperator =
  | 'eq'
  | 'gt'
  | 'lt'
  | 'gte'
  | 'lte'
  | 'like'
  | 'likeStart'
  | 'likeEnd'
  | 'in';

export interface Filter<T extends object, K extends keyof T = keyof T> {
  field: keyof T;
  operator: FilterOperator;
  value: T[K];
}

export interface Pagination {
  skip?: number;
  take?: number;
}

export type Ordering<T extends object> = Partial<
  Record<keyof T, 'asc' | 'desc'>
>;
export type Order<T extends object> = {
  order?: Ordering<T>;
};

export type FilterGroupOperator = 'and' | 'or';

export interface FilterGroup<T extends object, K extends keyof T = keyof T> {
  filter: Filter<T, K>;
  operator: FilterGroupOperator;
}

export interface SearchCriteria<T extends object, K extends keyof T = keyof T>
  extends Pagination,
    Order<T> {
  filter: (Filter<T, K> | FilterGroup<T, K>)[];
}

export const isFilterGroup = <T extends object, K extends keyof T = keyof T>(
  value: Filter<T, K> | FilterGroup<T, K>,
): value is FilterGroup<T, K> =>
  value.operator === 'and' || value.operator === 'or';

export const isFilter = <T extends object, K extends keyof T = keyof T>(
  value: Filter<T, K> | FilterGroup<T, K>,
): value is FilterGroup<T, K> =>
  value.operator !== 'and' && value.operator !== 'or';
