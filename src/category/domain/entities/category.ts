import Entity from '../../../common/domain/entity/entity';
import UniqueEntityId from '../../../common/domain/value-objects/unique-entity-id.vo';

export type CategoryProperties = {
  name: string;
  description?: string;
  isActive: boolean;
  createdAt: Date;
};

type CreateCategoryProperties = Partial<CategoryProperties> & { name: string };

export class Category extends Entity<CategoryProperties> {
  constructor(props: CreateCategoryProperties, id?: UniqueEntityId) {
    super(props as CategoryProperties, id);
    this.props.isActive = props.isActive ?? true;
    this.props.createdAt = props.createdAt ?? new Date();
  }

  get name() {
    return this.props.name;
  }

  get description(): string | undefined {
    return this.props.description;
  }

  private set description(value: string) {
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

  update(name: string, description?: string) {
    this.props.name = name;
    this.props.description = description;
  }

  activate() {
    this.props.isActive = true;
  }

  deactivate() {
    this.props.isActive = false;
  }
}
