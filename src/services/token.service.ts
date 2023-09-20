import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import { tokenTypes } from '../config/tokens';
const SECRET_KEY = process.env.SECRET_KEY;

const generateToken = async (id: number, expires: any, type: string, role: string) => {
  try {
    const payload = {
      sub: id,
      role,
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

const generateAuthTokens = async (id: number, role: string) => {
  const accessTokenExpires = moment().add(process.env.JWT_ACCESS_EXPIRATION_MINUTES, 'minutes');
  const accessToken = await generateToken(id, accessTokenExpires, tokenTypes.ACCESS, role);

  const refreshTokenExpires = moment().add(process.env.JWT_REFRESH_EXPIRATION_DAYS, 'days');
  const refreshToken = await generateToken(id, refreshTokenExpires, tokenTypes.REFRESH, role);

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
  const authHeader = req.headers.authorization || req.query.token || req.cookies.token;
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
    const decoded = jwt.verify(token, String(SECRET_KEY));
    return decoded;
  } catch (error: any) {
    throw new Error(error);
  }
};

export { decodeToken, generateAuthTokens, verifyToken, generateToken };
