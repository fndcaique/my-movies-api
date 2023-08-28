import {
  PaginationOuputMapper,
  PaginationOutput
} from '../../../common/application/dto/pagination-output';
import { SearchInput } from '../../../common/application/dto/search-input';
import UseCase from '../../../common/application/use-case';
import CategoryRepository, {
  CategorySearchParams,
  CategorySearchResult
} from '../../domain/repository/category.repository';
import { CategoryOuputMappper, CategoryOutput } from '../dto/category-output';

export default class ListCategoriesUseCase implements UseCase<Input, Output> {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(input: Input): Promise<Output> {
    const params = new CategorySearchParams(input);
    const searchResult = await this.categoryRepository.search(params);
    return this.toOuput(searchResult);
  }

  private toOuput(searchResult: CategorySearchResult): Output {
    return {
      ...PaginationOuputMapper.toOutput(searchResult),
      items: searchResult.items.map(CategoryOuputMappper.toOutput)
    };
  }
}

export type Input = SearchInput<string>;

export type Output = PaginationOutput<CategoryOutput>;
