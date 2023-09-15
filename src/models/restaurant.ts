import { Model, DataTypes, Sequelize } from 'sequelize';

export class Restaurant extends Model {
  public res_id!: number;
  public res_name!: string | null;
  public image!: string | null;
  public desc!: string | null;

  public static initTable(sequelize: Sequelize) {
    return super.init(
      {
        res_id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        res_name: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        image: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        desc: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'restaurant',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'res_id' }],
          },
        ],
      },
    );
  }
}
