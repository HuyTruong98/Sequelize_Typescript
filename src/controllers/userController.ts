import { Request, Response } from 'express';
import { errorCode, successCode } from '../config/response';
import { initModels } from '../models/init-models';
import { sequelize } from '../models';

const model = initModels(sequelize);
// import bcrypt from 'bcrypt';

// Get All User
const getAllUser = async (req: Request, res: Response) => {
  try {
    const data = await model.user.findAll();
    successCode(res, data, 'Success !');
  } catch (error) {
    errorCode(res, 'Internal server error !');
  }
};

export { getAllUser };
