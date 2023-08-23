import { SearchableRepositoryInterface } from '../../../common/domain/repository/repository.contracts';
import { Category } from '../entities/category';
export default interface CategoryRepository
  extends SearchableRepositoryInterface<Category, any, any> {}
