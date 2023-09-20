import express from 'express';
import { verifyToken } from '../services/token.service';
import { getAllUserByParam, createUser, updateUserById, deleteUserById } from '../controllers/user.controller';
const userRoute = express.Router();

userRoute.get('/list', verifyToken, getAllUserByParam);

userRoute.post('/create', verifyToken, createUser);

userRoute.put('/update/:user_id', verifyToken, updateUserById);

userRoute.delete('/delete/:user_id', verifyToken, deleteUserById);

export { userRoute };

/**
 * @swagger
 * paths:
 *   /user/list:
 *     get:
 *       description: responses
 *       tags: [User]
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
 *   /user/create:
 *     post:
 *       description: Create User
 *       tags: [User]
 *       security:
 *         - BearerAuth: []
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
 *   /user/update/{user_id}:
 *     put:
 *       description: Update User
 *       tags: [User]
 *       security:
 *         - BearerAuth: []
 *       parameters:
 *         - in: path
 *           name: user_id
 *           required: true
 *           schema:
 *             type: integer
 *           description: ID of the user to update
 *         - in: body
 *           name: credentials
 *           required: true
 *           schema:
 *             type: object
 *             properties:
 *               full_name:
 *                 type: string
 *               pass_word:
 *                 type: string
 *             example:
 *               full_name: example
 *               pass_word: Password@1
 *           description: User credentials as a JSON object
 *   /user/delete/{user_id}:
 *     delete:
 *       description: Delete User
 *       tags: [User]
 *       security:
 *         - BearerAuth: []
 *       parameters:
 *         - in: path
 *           name: user_id
 *           required: true
 *           schema:
 *             type: integer
 *           description: ID of the user to delete
 */

