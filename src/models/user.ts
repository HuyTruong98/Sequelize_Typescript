import { Model, DataTypes, Sequelize } from 'sequelize';

export class User extends Model {
  public user_id!: number;
  public full_name!: string | null;
  public email!: string | null;
  public pass_word!: string | null;
  public role!: string | null;
  public regDt!: string | null;
  public modDt!: string | null;

  public static initTable(sequelize: Sequelize) {
    return super.init(
      {
        user_id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        full_name: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        pass_word: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        role: {
          type: DataTypes.STRING(200),
          allowNull: false,
        },
        regDt: {
          type: DataTypes.STRING(200),
          allowNull: false,
        },
        modDt: {
          type: DataTypes.STRING(200),
          allowNull: true,
        },
        isVerified: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
      },
      {
        sequelize,
        tableName: 'user',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'user_id' }],
          },
        ],
      },
    );
  }
}
