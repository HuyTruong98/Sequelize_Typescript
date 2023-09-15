import express from 'express';
import { getAllUser, login, signUp, refreshToken } from '../controllers/auth.controller';
import { verifyToken } from '../services/token.service';
// import { authenticateToken } from '../controllers/authController';
const useRoute = express.Router();

useRoute.get('/list', verifyToken, getAllUser);

useRoute.post('/sign-up', signUp);

useRoute.post('/login', login);

useRoute.post('/refresh-tokens', refreshToken);

export { useRoute };
