import express from 'express';
import { authRoute } from './auth.route';
import { userRoute } from './user.route';
const rootRoute = express.Router();

rootRoute.use('/auth', authRoute);
rootRoute.use('/user', userRoute);

export { rootRoute };
