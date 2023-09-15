import { Model, DataTypes, Sequelize } from 'sequelize';

export class Food extends Model {
  public food_id!: number;
  public food_name!: string | null;
  public image!: string | null;
  public price!: number | null;
  public desc!: string | null;
  public type_id!: number | null;

  public static initTable(sequelize: Sequelize) {
    return super.init(
      {
        food_id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        food_name: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        image: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        price: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        desc: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        type_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: 'food_type',
            key: 'type_id',
          },
        },
      },
      {
        sequelize,
        tableName: 'food',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'food_id' }],
          },
          {
            name: 'type_id',
            using: 'BTREE',
            fields: [{ name: 'type_id' }],
          },
        ],
      },
    );
  }
}
