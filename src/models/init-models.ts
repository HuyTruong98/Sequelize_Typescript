import { Sequelize } from 'sequelize';
import { User } from './user';
import { VerificationCode } from './verification_codes';

function initModels(sequelize: Sequelize) {
  const user = User.initTable(sequelize);
  const verification_codes = VerificationCode.initTable(sequelize);

  verification_codes.belongsTo(user, { as: 'user', foreignKey: 'user_id' });
  user.hasMany(verification_codes, { as: 'verification_codes', foreignKey: 'user_id' });

  return {
    user,
    verification_codes,
  };
}

export default initModels;
