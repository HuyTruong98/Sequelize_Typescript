import { Request, Response } from 'express';
import { createCode, errorCode, failCode, successCode } from '../middleware/response';
import { create, deleteById, getAll, updateById } from '../services/user.service';
import { optionsUser } from '../@types/dto';

const getAllUserByParam = async (req: Request, res: Response) => {
  try {
    const { page, perPage, keyword } = req.query;
    const options = {
      limit: Number(perPage) || 10,
      offset: (((Number(page) || 1) as number) - 1) * ((Number(perPage) || 0) as number),
    };

    const data = await getAll(options as optionsUser, keyword as string);
    return successCode(res, data, 'Success !');
  } catch (error) {
    return errorCode(res, 'Internal server error !');
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    const { full_name, email, pass_word } = req.body;
    const newUser = await create(full_name, email, pass_word);
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

const updateUserById = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;
    const { full_name, pass_word } = req.body;

    const updateUser = await updateById(Number(user_id), full_name, pass_word);
    if (updateUser) successCode(res, true, 'Update success !');
  } catch (error) {
    return errorCode(res, 'Internal server error !');
  }
};

const deleteUserById = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;
    const confirmDelete = await deleteById(Number(user_id));
    if (confirmDelete) successCode(res, true, 'Update success !');
  } catch (error: any) {
    if (error.message.includes('foreign key constraint fails')) {
      return errorCode(res, 'Foreign key constraint fails !');
    }
    return errorCode(res, 'Internal server error !');
  }
};

export { getAllUserByParam, createUser, updateUserById, deleteUserById };
