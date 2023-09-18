import { Request, Response } from 'express';
import { createCode, errorCode, failCode, successCode } from '../middleware/response';
import { createUser, getAll, loginUser, refreshAuth } from '../services/auth.service';

// Get All User
const getAllUser = async (req: Request, res: Response) => {
  try {
    const data = await getAll();
    return successCode(res, data, 'Success !');
  } catch (error) {
    return errorCode(res, 'Internal server error !');
  }
};

const signUp = async (req: Request, res: Response) => {
  try {
    const { full_name, email, pass_word } = req.body;

    const newUser = await createUser(full_name, email, pass_word);

    if (newUser) {
      return createCode(res, newUser, 'Create user success !');
    }
  } catch (error: any) {
    if (error.message === 'Email already exists') {
      return failCode(res, {}, 'Email already exists');
    }
    return errorCode(res, 'Internal server error !');
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, pass_word } = req.body;
    const token = await loginUser(email, pass_word);

    if (token) {
      return successCode(res, token, 'Login success.');
    } else {
      return failCode(res, '', 'Email or password is incorrect !');
    }
  } catch (error) {
    return errorCode(res, 'Internal server error !');
  }
};

const refreshToken = async (req: Request & { user?: any }, res: Response) => {
  try {
    const newAccessToken = await refreshAuth(req.body.refreshToken);
    return successCode(res, newAccessToken, 'Refresh token success !');
  } catch (error) {
    return errorCode(res, 'Failed to refresh Access Token !');
  }
};
export { getAllUser, login, refreshToken, signUp };
