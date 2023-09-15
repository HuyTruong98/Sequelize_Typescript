import { Model, DataTypes, Sequelize } from 'sequelize';

export class FoodType extends Model {
  public type_id!: number;
  public type_name!: string | null;

  public static initTable(sequelize: Sequelize) {
    return super.init(
      {
        type_id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        type_name: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'food_type',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'type_id' }],
          },
        ],
      },
    );
  }
}
