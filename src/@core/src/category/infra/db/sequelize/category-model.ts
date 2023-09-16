import { SequelizeModelFactory } from '#common/infra';
import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table
} from 'sequelize-typescript';

export type CategoryModelProperties = {
  id: string;
  name: string;
  description: string | null;
  isActive: boolean;
  createdAt: Date;
};

@Table({ tableName: 'category', timestamps: false })
export class CategoryModel extends Model<CategoryModelProperties> {
  @PrimaryKey
  @Column({ type: DataType.UUID })
  declare id: string;

  @Column({ type: DataType.STRING(128), allowNull: false })
  declare name: string;

  @Column({ type: DataType.STRING(256), allowNull: true })
  declare description: string | null;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  declare isActive: boolean;

  @Column({ type: DataType.DATE, allowNull: false })
  declare createdAt: Date;

  static factory() {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const chance: Chance.Chance = require('chance')();
    return new SequelizeModelFactory(CategoryModel, () => ({
      id: chance.guid({ version: 4 }),
      name: chance.word(),
      description: chance.sentence(),
      isActive: true,
      createdAt: chance.date()
    }));
  }
}
