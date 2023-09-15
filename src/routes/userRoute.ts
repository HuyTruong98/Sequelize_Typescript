import express from 'express';
import { getAllUser } from '../controllers/userController';
const useRoute = express.Router();

useRoute.get('/list', getAllUser);

export { useRoute };
