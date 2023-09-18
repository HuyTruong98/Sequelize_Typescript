import express from 'express';
import { verifyToken } from '../services/token.service';
import { getAllUserByParam, createUser, updateUserById } from '../controllers/user.controller';
const userRoute = express.Router();

userRoute.get('/list', verifyToken, getAllUserByParam);

userRoute.post('/create', createUser);

userRoute.put('/update/:user_id', verifyToken, updateUserById);

export { userRoute };
