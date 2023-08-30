import { Entity } from '#common/domain/entity/entity';
import { EntityValidationError } from '#common/domain/errors/validation.error';
import { UniqueEntityId } from '#common/domain/value-objects/unique-entity-id.vo';
import { CategoryValidatorFactory } from '../validators/category.validator';

export type CategoryProperties = {
  name: string;
  description: string | null;
  isActive: boolean;
  createdAt: Date;
};

export type CreateCategoryProperties = Partial<CategoryProperties> & {
  name: string;
};

export class Category extends Entity<CategoryProperties> {
  constructor(props: CreateCategoryProperties, id?: UniqueEntityId) {
    Category.validate(props);
    super(props as CategoryProperties, id);
    this.description = props.description ?? null;
    this.props.isActive = props.isActive ?? true;
    this.props.createdAt = props.createdAt ?? new Date();
  }

  get name() {
    return this.props.name;
  }

  get description(): string | null {
    return this.props.description;
  }

  private set description(value: string | null) {
    this.props.description = value;
  }

  get isActive() {
    return this.props.isActive;
  }

  private set isActive(value: boolean) {
    this.props.isActive = value;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  update(name: string, description?: string | null) {
    Category.validate({ name, description });
    this.props.name = name;
    this.props.description = description ?? null;
  }

  // static validate(props: CreateCategoryProperties) {
  //   ValidatorRules.values(props.name, 'name')
  //     .required()
  //     .string()
  //     .minLength(2)
  //     .maxLength(128);
  //   ValidatorRules.values(props.description, 'description')
  //     .string()
  //     .maxLength(256);
  //   ValidatorRules.values(props.isActive, 'isActive').boolean();
  // }

  static validate(props: CreateCategoryProperties) {
    const validator = CategoryValidatorFactory.create();
    if (!validator.validate(props)) {
      throw new EntityValidationError(validator.errors);
    }
  }

  activate() {
    this.isActive = true;
  }

  deactivate() {
    this.isActive = false;
  }
}
