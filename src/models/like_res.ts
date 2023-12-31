import { Model, DataTypes, Sequelize } from 'sequelize';

export class LikeRes extends Model {
  public user_id!: number;
  public res_id!: number;
  public date_like!: Date | null;

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
        res_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'restaurant',
            key: 'res_id',
          },
        },
        date_like: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'like_res',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'user_id' }, { name: 'res_id' }],
          },
          {
            name: 'res_id',
            using: 'BTREE',
            fields: [{ name: 'res_id' }],
          },
        ],
      },
    );
  }
}
