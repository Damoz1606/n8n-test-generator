import {Aggregate} from "./domain";
import {SearchCriteria} from "./filter";
import {Result} from "./result";

export interface AggregateRepository<T extends Aggregate> {
  findOne(criteria: SearchCriteria<T>): Promise<Result<T>>;

  save(aggregate: T): Promise<Result>;
}

export interface SnapshotRepository<T extends object> {
  findOne(criteria: SearchCriteria<T>): Promise<Result<T>>;

  findMany(criteria: SearchCriteria<T>): Promise<Result<T[]>>;
}
