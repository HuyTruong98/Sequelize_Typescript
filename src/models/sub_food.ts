import { Model, DataTypes, Sequelize } from 'sequelize';

export class SubFood extends Model {
  public sub_id!: number;
  public sub_name!: string | null;
  public sub_price!: number | null;
  public food_id!: number | null;

  public static initTable(sequelize: Sequelize) {
    return super.init(
      {
        sub_id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        sub_name: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        sub_price: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        food_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'sub_food',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'sub_id' }],
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
