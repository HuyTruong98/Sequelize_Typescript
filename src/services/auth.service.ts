import bcrypt from 'bcrypt';
import { JwtPayload } from 'jsonwebtoken';
import { roleTypes } from '../config/role';
import { tokenTypes } from '../config/tokens';
import { sequelize } from '../models';
import { initModels } from '../models/init-models';
import { decodeToken, generateAuthTokens } from './token.service';

const model = initModels(sequelize);

const getAll = async () => {
  const data = await model.user.findAll();
  return data;
};

const createUser = async (fullName: string, email: string, password: string) => {
  const existingUser = await model.user.findOne({ where: { email } });
  if (existingUser) {
    throw new Error('Email already exists');
  }

  const newUser = await model.user.create({
    full_name: fullName,
    email,
    pass_word: bcrypt.hashSync(password, 10),
    role: roleTypes.ROLE_USER,
  });

  return newUser;
};

const getUserByEmail = async (email: string) => {
  return model.user.findOne({ where: { email } });
};

const loginUser = async (email: string, password: string) => {
  const user = await getUserByEmail(email);
  if (user) {
    const isPasswordCorrect = bcrypt.compareSync(password, user.dataValues.pass_word);
    if (isPasswordCorrect) {
      const token = await generateAuthTokens(user.dataValues.user_id, user.dataValues.role);
      return token;
    }
  }

  return null;
};

const refreshAuth = async (refreshToken: string) => {
  try {
    const decodedToken = decodeToken(refreshToken) as JwtPayload;

    if (decodedToken?.type !== tokenTypes.REFRESH) {
      throw new Error('Invalid Refresh Token Type');
    }

    const payload = generateAuthTokens(Number(decodedToken?.sub), decodedToken?.role);

    return payload;
  } catch (error) {
    console.error('Error refreshing Access Token:', error);
    throw new Error('Failed to refresh Access Token');
  }
};

export { createUser, getAll, getUserByEmail, loginUser, refreshAuth };
