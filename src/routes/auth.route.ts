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

/**
 * @swagger
 * paths:
 *   /auth/list:
 *     get:
 *       description: responses
 *       tags: [Auth]
 *       security:
 *         - BearerAuth: []
 *       responses:
 *         '200':
 *           description: Success
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *         '400':
 *           description: Bad Request
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *         '401':
 *           description: Unauthorized
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *         '403':
 *           description: Forbidden
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *         '404':
 *           description: Not Found
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *         '500':
 *           description: Internal Server Error
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *   /auth/login:
 *     post:
 *       description: User login
 *       tags: [Auth]
 *       parameters:
 *         - in: body
 *           name: credentials
 *           required: true
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               pass_word:
 *                 type: string
 *             example:
 *               email: fake@example.com
 *               pass_word: Password@1
 *           description: User credentials as a JSON object
 *       responses:
 *         '200':
 *           description: Login Successful
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *               token:
 *                 type: string
 *         '400':
 *           description: Email or password is incorrect !
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *         '500':
 *           description: Internal server error !
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *   /auth/sign-up:
 *     post:
 *       description: User sign up
 *       tags: [Auth]
 *       parameters:
 *         - in: body
 *           name: credentials
 *           required: true
 *           schema:
 *             type: object
 *             properties:
 *               full_name:
 *                 type: string
 *               email:
 *                 type: string
 *               pass_word:
 *                 type: string
 *             example:
 *               full_name: example
 *               email: fake@example.com
 *               pass_word: Password@1
 *           description: User credentials as a JSON object
 *       responses:
 *         '200':
 *           description: Create user successful !
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *         '400':
 *           description: Email already exists !
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *         '500':
 *           description: Internal server error !
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *   /auth/send-email-verify:
 *     post:
 *       description: Verify email
 *       tags: [Auth]
 *       parameters:
 *         - in: body
 *           name: credentials
 *           required: true
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *             example:
 *               email: fake@example.com
 *           description: Verify email before sign up
 *       responses:
 *         '200':
 *           description: Verify email successful !
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *         '400':
 *           description: Email already exists !
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *         '500':
 *           description: Internal server error !
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *   /auth/verify-email:
 *     post:
 *       description: Verify email with token
 *       tags: [Auth]
 *       parameters:
 *         - in: body
 *           name: credentials
 *           required: true
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *             example:
 *               token: abcxyz
 *           description: Verify email with token
 *       responses:
 *         '200':
 *           description: Verify email with token
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *         '400':
 *           description: Email has not been verified !
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *         '500':
 *           description: Internal server error !
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 */

