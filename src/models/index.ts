import { Sequelize } from 'sequelize';
import config from '../middleware';

export const sequelize = new Sequelize(config.database!, config.userName!, config.passWord!, {
  host: config.host!,
  port: Number(config.port!),
  dialect: config.dialect as 'mysql',
});

const checkConnect = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

checkConnect();
