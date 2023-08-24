/* eslint-disable @typescript-eslint/no-unused-vars */
import { InMemorySearchableRepository } from '../../../common/domain/repository/in-memory.repository';
import { Category } from '../../domain/entities/category';
import CategoryRepository from '../../domain/repository/category.repository';

export default class CategoryInMemoryRepository
  extends InMemorySearchableRepository<Category>
  implements CategoryRepository
{
  protected applyFilter(
    items: Category[],
    filter: string | null
  ): Promise<Category[]> {
    throw new Error('Method not implemented.');
  }
}
