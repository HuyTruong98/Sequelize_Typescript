import { Sequelize } from 'sequelize';
import { User } from './user';
import { VerificationCode } from './verification_codes';

export function initModels(sequelize: Sequelize) {
  const user = User.initTable(sequelize);
  const verification_codes = VerificationCode.initTable(sequelize);

  return {
    user,
    verification_codes,
  };
}

export default initModels;
