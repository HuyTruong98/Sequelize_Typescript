import express from 'express';
import { useRoute } from './auth.route';
const rootRoute = express.Router();

rootRoute.use('/auth', useRoute);

export { rootRoute };
