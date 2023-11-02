import { CategoryId } from '../../../category';
import { EntityValidationError, UniqueEntityId } from '../../../common';
import { AggregateRoot } from '../../../common/domain/entity/aggregate-root';
import { GenreValidatorFactory } from '../validators/genre.validator';

export type GenreProperties = {
  name: string;
  categoriesId: Map<string, CategoryId>;
  isActive: boolean;
  createdAt: Date;
};

export class GenreId extends UniqueEntityId {}

export type GenrePropsJson = { id: string } & Omit<
  GenreProperties,
  'categoriesId'
> & { categoriesId: string[] };

export type GenreConstructorProperties = Partial<GenreProperties> & {
  name: string;
  categoriesId: Map<string, CategoryId>;
};

export type GenreCreateCommand = Partial<
  Omit<GenreProperties, 'categoriesId'>
> & {
  name: string;
  categoriesId: string[];
};

export class Genre extends AggregateRoot<
  GenreId,
  GenreProperties,
  GenrePropsJson
> {
  constructor(props: GenreConstructorProperties, entityId?: GenreId) {
    Genre.validate(props);
    const onlyAcceptedProps: GenreConstructorProperties = {
      name: props.name,
      categoriesId: props.categoriesId,
      createdAt: props.createdAt,
      isActive: props.isActive,
    };
    super(onlyAcceptedProps as GenreProperties, entityId ?? new GenreId());
    this.props.isActive = props.isActive ?? true;
    this.props.createdAt = props.createdAt ?? new Date();
  }

  static create(props: GenreCreateCommand, id?: GenreId) {
    const categoriesId = new Map<string, CategoryId>();
    props.categoriesId.forEach((categoryId) => {
      categoriesId.set(categoryId, new CategoryId(categoryId));
    });

    return new Genre({ ...props, categoriesId }, id);
  }

  update(name: string): void {
    Genre.validate({ ...this.props, name });
    this.name = name;
  }

  addCategoryId(categoryId: CategoryId) {
    this.categoriesId.set(categoryId.value, categoryId);
  }

  removeCategoryId(categoryId: CategoryId) {
    this.categoriesId.delete(categoryId.value);
  }

  updateCategoriesId(categoriesId: CategoryId[]) {
    const newCategoriesId = new Map<string, CategoryId>();
    categoriesId.forEach((categoryId) => {
      newCategoriesId.set(categoryId.value, categoryId);
    });
    Genre.validate({
      ...this.props,
      categoriesId: newCategoriesId,
    });
    this.categoriesId = newCategoriesId;
  }

  static validate(props: GenreConstructorProperties) {
    const validator = GenreValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  activate() {
    this.props.isActive = true;
  }

  deactivate() {
    this.props.isActive = false;
  }

  get name() {
    return this.props.name;
  }

  private set name(value: string) {
    this.props.name = value;
  }

  get categoriesId() {
    return this.props.categoriesId;
  }

  private set categoriesId(value: Map<string, CategoryId>) {
    this.props.categoriesId = value;
  }

  get isActive() {
    return this.props.isActive;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  private set createdAt(value: Date) {
    this.props.createdAt = value;
  }

  toJSON(): GenrePropsJson {
    return {
      ...this.props,
      categoriesId: Array.from(this.props.categoriesId.values()).map(
        (categoryId) => categoryId.value,
      ),
      id: this.id,
    };
  }
}
