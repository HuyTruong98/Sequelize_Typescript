import { Request, Response } from 'express';
import { errorCode, successCode, failCode, createCode } from '../middleware/response';
import { createUser, loginUser, getAll, refreshAuth } from '../services/auth.service';

// Get All User
const getAllUser = async (req: Request, res: Response) => {
  try {
    const data = await getAll();
    successCode(res, data, 'Success !');
  } catch (error) {
    errorCode(res, 'Internal server error !');
  }
};

const signUp = async (req: Request, res: Response) => {
  try {
    const { full_name, email, pass_word } = req.body;

    const newUser = await createUser(full_name, email, pass_word);

    if (newUser) {
      createCode(res, newUser, 'Create user success !');
    } else {
      failCode(res, email, 'Email already exits !');
    }
  } catch (error) {
    errorCode(res, 'Internal server error !');
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, pass_word } = req.body;
    const token = await loginUser(email, pass_word);

    if (token) {
      successCode(res, token, 'Login success.');
    } else {
      failCode(res, '', 'Email or password is incorrect !');
    }
  } catch (error) {
    errorCode(res, 'Internal server error !');
  }
};

const refreshTokens = async (req: Request, res: Response) => {
  try {
    const newAccessToken = await refreshAuth(req);
    successCode(res, newAccessToken, 'Refresh token success.');
  } catch (error) {
    errorCode(res, 'Internal server error !');
  }
};

export { getAllUser, signUp, login, refreshTokens };
