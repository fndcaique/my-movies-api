import {
  PaginationOuputMapper,
  PaginationOutput,
} from '@core/common/application/dto/pagination-output';
import { SearchInput } from '@core/common/application/dto/search-input';
import { UseCase } from '@core/common/application/use-case';
import {
  CategoryRepository,
  CategorySearchParams,
  CategorySearchResult,
} from '../../domain/repository/category.repository';
import { CategoryOuputMappper, CategoryOutput } from '../dto/category-output';

export class ListCategoriesUseCase
  implements UseCase<ListCategoriesInput, ListCategoriesOutput>
{
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(input: ListCategoriesInput): Promise<ListCategoriesOutput> {
    const params = new CategorySearchParams(input);
    const searchResult = await this.categoryRepository.search(params);
    return this.toOuput(searchResult);
  }

  private toOuput(searchResult: CategorySearchResult): ListCategoriesOutput {
    return {
      ...PaginationOuputMapper.toOutput(searchResult),
      items: searchResult.items.map(CategoryOuputMappper.toOutput),
    };
  }
}

export type ListCategoriesInput = SearchInput<string>;

export type ListCategoriesOutput = PaginationOutput<CategoryOutput>;
