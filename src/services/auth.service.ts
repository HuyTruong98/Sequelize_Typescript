import bcrypt from 'bcrypt';
import { JwtPayload } from 'jsonwebtoken';
import moment from 'moment';
import { roleTypes } from '../config/role';
import { tokenTypes } from '../config/tokens';
import { sequelize } from '../models';
import initModels from '../models/init-models';
import { generateUniqueCode } from '../utils/verifyCode';
import { sendResetPasswordEmail, verifyEmailAccount } from './email.service';
import { decodeToken, generateAuthTokens, generateToken } from './token.service';
import { getById } from './user.service';

const model = initModels(sequelize);

const getAll = async () => {
  const data = await model.user.findAll();
  return data;
};

const createUser = async (full_name: string, email: string, password: string) => {
  const existingUser = await model.user.findOne({ where: { email } });
  if (existingUser) {
    throw new Error('Email already exists');
  }
  const newUser = await model.user.create({
    full_name,
    email,
    pass_word: bcrypt.hashSync(password, 10),
    role: roleTypes.ROLE_USER,
    regDt: moment(new Date()).format('YYYY-MM-DDTHH:mm:ss'),
  });

  return newUser;
};

const getUserByEmail = async (email: string) => {
  return model.user.findOne({ where: { email } });
};

const loginUser = async (email: string, password: string) => {
  const user = await getUserByEmail(email);
  if (user?.dataValues.isVerified) {
    const isPasswordCorrect = bcrypt.compareSync(password, user.dataValues.pass_word);
    if (isPasswordCorrect) {
      const token = await generateAuthTokens(user.dataValues.user_id, user.dataValues.role);
      return token;
    }
  } else {
    throw new Error('Verify email before login');
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

const sendEmailUrlVerify = async (email: string) => {
  const currentUser = await getUserByEmail(email);
  console.log('🚀 ~ file: auth.service.ts:74 ~ sendEmailUrlVerify ~ currentUser:', currentUser);
  if (!currentUser) {
    throw new Error('Email has not been exists');
  } else if (currentUser.dataValues.isVerified) {
    throw new Error('Email already verify');
  }
  const tokenVerifyEmail = await generateToken(
    currentUser.dataValues.user_id,
    moment().add(process.env.JWT_VERIFY_EXPIRATION_MINUTES, 'minutes'),
    email,
    currentUser.dataValues.role,
  );
  const linkToVerify = `http://localhost:${process.env.PORT}/verify-email/:${tokenVerifyEmail}`;

  const sendEmail = await verifyEmailAccount(email, linkToVerify);
  return sendEmail;
};

const updateIsVerifiedById = async (user_id: number) => {
  const currentUser = await getById(user_id);
  if (!currentUser) {
    throw new Error('User has not been exists');
  }

  const body = {
    ...currentUser,
    isVerified: true,
  };

  const updateUser = await model.user.update(body, {
    where: {
      user_id,
    },
  });

  return updateUser;
};

const generateVerifyEmailToken = async (token: string) => {
  try {
    const decodedToken = decodeToken(token) as JwtPayload;
    const currentUser = await getUserByEmail(decodedToken.type);
    if (currentUser) {
      const updateUser = await updateIsVerifiedById(Number(decodedToken.sub));
      if (updateUser) return true;
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const resetPwdByEmail = async (email: string) => {
  const currentUser = await getUserByEmail(email);
  if (!currentUser?.dataValues.isVerified) {
    throw new Error('Email has not been verified');
  }

  const createCode = generateUniqueCode();
  const sendEmail = await sendResetPasswordEmail(email, createCode);
  console.log('🚀 sendEmail:', sendEmail);
};

export {
  createUser,
  getAll,
  getUserByEmail,
  loginUser,
  refreshAuth,
  sendEmailUrlVerify,
  generateVerifyEmailToken,
  resetPwdByEmail,
};
