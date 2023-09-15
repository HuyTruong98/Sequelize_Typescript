import { initModels } from '../models/init-models';
import { sequelize } from '../models';
import bcrypt from 'bcrypt';
import { generateAuthTokens, verifyToken } from './token.service';
import { Request, Response } from 'express';

const model = initModels(sequelize);

const getAll = async () => {
  const data = await model.user.findAll();
  return data;
};

const createUser = async (fullName: string, email: string, password: string) => {
  const existingUser = await model.user.findOne({ where: { email } });
  if (existingUser) {
    return null; // Trả về null nếu email đã tồn tại
  }

  const newUser = await model.user.create({
    full_name: fullName,
    email,
    pass_word: bcrypt.hashSync(password, 10),
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
      const token = await generateAuthTokens({ ...user.dataValues, pass_word: '' });
      return token;
    }
  }

  return null;
};

const refreshAuth = async (
  req: Request & {
    user?: any;
  },
) => {
  return new Promise<string>((resolve, reject) => {
    const authHeader = req.body.refreshToken;
    const refreshToken = authHeader && authHeader.split(' ')[1];

    if (!refreshToken) {
      reject(new Error('Refresh Token is required !'));
    }

    verifyToken(req, {} as Response, async (err) => {
      if (err) {
        reject(new Error('Invalid Refresh Token !'));
      }

      try {
        // const newAccessToken = await generateAuthTokens(req.user);
        console.log(req.user);
      } catch (error) {
        reject(new Error('Failed to refresh Access Token !'));
      }
    });
  });
};

export { getAll, createUser, loginUser, getUserByEmail, refreshAuth };
