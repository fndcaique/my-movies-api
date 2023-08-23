import Entity from '../entity/entity';
import UniqueEntityId from '../value-objects/unique-entity-id.vo';
import { QueryPaginationInterface } from './query-pagination.interface';

export interface RepositoryInterface<E extends Entity> {
  insert(entity: E): Promise<void>;
  findById(id: string | UniqueEntityId): Promise<E>;
  find(query: QueryPaginationInterface): Promise<E[]>;
  update(entity: E): Promise<void>;
  delete(id: string | UniqueEntityId): Promise<void>;
}
