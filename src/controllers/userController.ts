import { Request, Response } from 'express';
import { errorCode, successCode, failCode, createCode } from '../middleware/response';
import { initModels } from '../models/init-models';
import { sequelize } from '../models';
import bcrypt from 'bcrypt';
import { generateAuthTokens } from '../middleware/jwt';

const model = initModels(sequelize);

// Get All User
const getAllUser = async (req: Request, res: Response) => {
  try {
    const data = await model.user.findAll();
    successCode(res, data, 'Success !');
  } catch (error) {
    errorCode(res, 'Internal server error !');
  }
};

const signUp = async (req: Request, res: Response) => {
  try {
    const { full_name, email, pass_word } = req.body;

    const modalUser = {
      full_name,
      email,
      pass_word: bcrypt.hashSync(pass_word, 10),
    };

    const checkEmail = await model.user.findOne({
      where: {
        email,
      },
    });

    if (checkEmail) {
      failCode(res, email, 'Email already exits !');
    } else {
      await model.user.create(modalUser);
      createCode(res, modalUser, 'Create user success !');
    }
  } catch (error) {
    errorCode(res, 'Internal server error !');
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, pass_word } = req.body;

    const checkEmail = await model.user.findOne({
      where: {
        email,
      },
    });

    if (checkEmail) {
      const checkPass = bcrypt.compareSync(pass_word, checkEmail?.dataValues.pass_word);

      if (checkPass) {
        const token = await generateAuthTokens({ ...checkEmail.dataValues, pass_word: '' });
        successCode(res, token, 'Login success.');
      } else {
        failCode(res, '', 'Password is incorrect !');
      }
    }
  } catch (error) {
    errorCode(res, 'Internal server error !');
  }
};

export { getAllUser, signUp, login };
