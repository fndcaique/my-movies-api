/* eslint-disable @typescript-eslint/no-unused-vars */
import { InMemorySearchableRepository } from '#common/domain/repository/in-memory.repository';
import { SortDirection } from '#common/domain/repository/repository.contracts';
import { removeAccents } from '#common/domain/utils/functions';
import { Category } from '../../domain/entities/category';
import { CategoryRepository } from '../../domain/repository/category.repository';

export class CategoryInMemoryRepository
  extends InMemorySearchableRepository<Category>
  implements CategoryRepository
{
  protected async applyFilter(
    items: Category[],
    filter: string | null
  ): Promise<Category[]> {
    if (!filter) {
      return items;
    }
    return items.filter((item) =>
      removeAccents(item.props.name.toLowerCase()).includes(
        removeAccents(filter.toLowerCase())
      )
    );
  }

  protected async applySort(
    items: Category[],
    sortBy?: string | null | undefined,
    sortDir?: SortDirection | null | undefined
  ): Promise<Category[]> {
    return super.applySort(items, sortBy ?? 'createdAt', sortDir);
  }
}
