import express from 'express';
import {
  getAllUser,
  login,
  signUp,
  refreshToken,
  verifyEmailAccount,
  resetPassword,
} from '../controllers/auth.controller';
import { verifyToken } from '../services/token.service';

const authRoute = express.Router();

authRoute.get('/list', verifyToken, getAllUser);

authRoute.post('/sign-up', signUp);

authRoute.post('/login', login);

authRoute.post('/refresh-tokens', refreshToken);

authRoute.post('/verify-email', verifyEmailAccount);

authRoute.post('/reset-password', resetPassword);

export { authRoute };
