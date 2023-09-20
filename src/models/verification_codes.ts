import { Sequelize, DataTypes, Model } from 'sequelize';

export class VerificationCode extends Model {
  public code_id!: number;
  public code!: string;
  public email!: string;
  public user_id!: number;
  public regDt!: string;

  public static initTable(sequelize: Sequelize) {
    return super.init(
      {
        code_id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        code: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'user',
            key: 'user_id',
          },
        },
        regDt: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'verification_codes',
        timestamps: false,
      },
    );
  }
}
