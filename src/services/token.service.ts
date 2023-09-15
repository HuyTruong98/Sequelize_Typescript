import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import { Request, Response, NextFunction } from 'express';
import moment from 'moment';
import { tokenTypes } from '../config/tokens';
const SECRET_KEY = process.env.SECRET_KEY;

const generateToken = async (id: number, expires: any, type: string) => {
  try {
    const payload = {
      sub: id,
      iat: moment().unix(),
      exp: expires.unix(),
      type,
    };
    const token = jwt.sign(payload, String(SECRET_KEY));
    return token;
  } catch (error) {
    console.error('Error generating token:', error);
    throw error;
  }
};

const generateAuthTokens = async (data: User) => {
  const accessTokenExpires = moment().add(process.env.JWT_ACCESS_EXPIRATION_MINUTES, 'minutes');
  const accessToken = await generateToken(data.user_id, accessTokenExpires, tokenTypes.ACCESS);

  const refreshTokenExpires = moment().add(process.env.JWT_REFRESH_EXPIRATION_DAYS, 'days');
  const refreshToken = await generateToken(data.user_id, refreshTokenExpires, tokenTypes.REFRESH);

  const payload = {
    accessToken: accessToken,
    refresh: refreshToken,
  };
  return payload;
};

const verifyToken = (
  req: Request & {
    user?: any;
  },
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.body;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Invalid token !' });
  }

  jwt.verify(token, String(SECRET_KEY), (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized !' });
    }

    req.user = decoded;

    next();
  });
};

const decodeToken = (token: string) => {
  try {
    const decoded = jwt.decode(token, { complete: true });
    return decoded;
  } catch (error) {
    return null;
  }
};

export { generateAuthTokens, verifyToken, decodeToken };
