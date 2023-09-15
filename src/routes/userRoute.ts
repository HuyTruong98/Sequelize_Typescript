import express from 'express';
import { getAllUser, login, signUp } from '../controllers/userController';
import { verifyToken } from '../middleware/jwt';
// import { authenticateToken } from '../controllers/authController';
const useRoute = express.Router();

useRoute.get('/list', verifyToken, getAllUser);

useRoute.post('/sign-up', signUp);

useRoute.post('/login', login);

export { useRoute };
