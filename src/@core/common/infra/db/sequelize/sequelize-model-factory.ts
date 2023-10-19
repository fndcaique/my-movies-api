import { Model } from 'sequelize-typescript';
export class SequelizeModelFactory<ModelClass extends Model, ModelProps = any> {
  private _count = 1;

  constructor(
    private model,
    private defaultFactoryProps: () => ModelProps,
  ) {}

  count(value: number) {
    this._count = value;
    return this;
  }

  async create(data?: ModelProps): Promise<ModelClass> {
    return this.model.create(data ? data : this.defaultFactoryProps());
  }

  make(data?: ModelProps): ModelClass {
    return this.model.build(data ? data : this.defaultFactoryProps());
  }

  async bulkCreate(
    factoryProps?: (index: number) => ModelProps,
  ): Promise<ModelClass[]> {
    const factory = factoryProps ?? this.defaultFactoryProps;
    const dataArray = Array.from(
      {
        length: this._count,
      },
      (_, index) => factory(index),
    );
    return this.model.bulkCreate(dataArray);
  }

  bulkMake(factoryProps?: (index: number) => ModelProps): ModelClass[] {
    const factory = factoryProps ?? this.defaultFactoryProps;
    const dataArray = Array.from(
      {
        length: this._count,
      },
      (_, index) => factory(index),
    );
    return this.model.bulkBuild(dataArray);
  }
}
