import dotenv from 'dotenv';
dotenv.config();

export default {
  database: process.env.DATABASE,
  userName: process.env.USERNAMEDB,
  passWord: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.PORTDB,
  dialect: process.env.DIALECT,
};
