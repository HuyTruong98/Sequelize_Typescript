import express from 'express';
import {
  getAllUser,
  login,
  signUp,
  refreshToken,
  sendEmailVerifyAccount,
  resetPassword,
  getTokenVerifyEmail,
} from '../controllers/auth.controller';
import { verifyToken } from '../services/token.service';

const authRoute = express.Router();

authRoute.get('/list', verifyToken, getAllUser);

authRoute.post('/sign-up', signUp);

authRoute.post('/login', login);

authRoute.post('/refresh-tokens', refreshToken);

authRoute.post('/send-email-verify', sendEmailVerifyAccount);

authRoute.post('/verify-email', getTokenVerifyEmail);

authRoute.post('/reset-password', resetPassword);

export { authRoute };
