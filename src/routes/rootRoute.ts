import express from 'express';
import { useRoute } from './userRoute';
const rootRoute = express.Router();

rootRoute.use('/user', useRoute);

export { rootRoute };
