import express from 'express';
import { verifyToken } from '../services/token.service';
import { getAllUserByParam, createUser, updateUserById, deleteUserById } from '../controllers/user.controller';
const userRoute = express.Router();

userRoute.get('/list', verifyToken, getAllUserByParam);

userRoute.post('/create', verifyToken, createUser);

userRoute.put('/update/:user_id', verifyToken, updateUserById);

userRoute.delete('/delete/:user_id', verifyToken, deleteUserById);

export { userRoute };
