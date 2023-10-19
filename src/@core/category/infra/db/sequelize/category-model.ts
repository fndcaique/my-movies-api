import { SequelizeModelFactory } from '@core/common/infra';
import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

export type CategoryModelProps = {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  created_at: Date;
};

@Table({ tableName: 'category', timestamps: false })
export class CategoryModel extends Model<CategoryModelProps> {
  @PrimaryKey
  @Column({ type: DataType.UUID })
  declare id: string;

  @Column({ type: DataType.STRING(128), allowNull: false })
  declare name: string;

  @Column({ type: DataType.STRING(256), allowNull: true })
  declare description: string | null;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  declare is_active: boolean;

  @Column({ type: DataType.DATE, allowNull: false })
  declare created_at: Date;

  static factory() {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const chance: Chance.Chance = require('chance')();
    return new SequelizeModelFactory<CategoryModel, CategoryModelProps>(
      CategoryModel,
      () => ({
        id: chance.guid({ version: 4 }),
        name: chance.word(),
        description: chance.sentence(),
        is_active: true,
        created_at: chance.date(),
      }),
    );
  }
}
