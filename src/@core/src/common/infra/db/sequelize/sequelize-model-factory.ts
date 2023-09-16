export class SequelizeModelFactory {
  private _count = 1;

  constructor(
    private model,
    private defaultFactoryProps: () => any
  ) {}

  count(value: number) {
    this._count = value;
    return this;
  }

  async create(data?) {
    return this.model.create(data ? data : this.defaultFactoryProps());
  }

  make(data?) {
    return this.model.build(data ? data : this.defaultFactoryProps());
  }

  async bulkCreate(factoryProps?: (index: number) => any) {
    const factory = factoryProps ?? this.defaultFactoryProps;
    const dataArray = Array.from(
      {
        length: this._count
      },
      (_, index) => factory(index)
    );
    return this.model.bulkCreate(dataArray);
  }

  bulkMake(factoryProps?: (index: number) => any) {
    const factory = factoryProps ?? this.defaultFactoryProps;
    const dataArray = Array.from(
      {
        length: this._count
      },
      (_, index) => factory(index)
    );
    return this.model.bulkBuild(dataArray);
  }
}
