import UniqueEntityId from '../../../common/domain/value-objects/unique-entity-id.vo';

export type CategoryProperties = {
  name: string,
  description?: string,
  isActive: boolean,
  createdAt: Date
}

type CreateCategoryProperties = Partial<CategoryProperties> & {name: string};

export class Category {
  public readonly id: UniqueEntityId;
  public readonly props: CategoryProperties;

  constructor(props: CreateCategoryProperties, id?: UniqueEntityId) {
    this.id = id || new UniqueEntityId();
    this.props = {
      name: props.name,
      description: props.description,
      isActive: props.isActive ?? true,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  get name () {
    return this.props.name;
  }

  get description (): string | undefined {
    return this.props.description;
  }

  private set description(value: string) {
    this.props.description = value;
  }

  get isActive () {
    return this.props.isActive;
  }

  private set isActive(value: boolean) {
    this.props.isActive = value;
  }

  get createdAt () {
    return this.props.createdAt;
  }
}
