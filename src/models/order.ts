import { Model, DataTypes, Sequelize } from 'sequelize';

export class Order extends Model {
  public user_id!: number;
  public food_id!: number;
  public amount!: number | null;
  public code!: string | null;
  public arr_sub_id!: string | null;

  public static initTable(sequelize: Sequelize) {
    return super.init(
      {
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'user',
            key: 'user_id',
          },
        },
        food_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'food',
            key: 'food_id',
          },
        },
        amount: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        code: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        arr_sub_id: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'order',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'user_id' }, { name: 'food_id' }],
          },
          {
            name: 'food_id',
            using: 'BTREE',
            fields: [{ name: 'food_id' }],
          },
        ],
      },
    );
  }
}
