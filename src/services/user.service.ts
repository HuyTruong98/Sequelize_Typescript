import bcrypt from 'bcrypt';
import { optionsUser } from '../@types/dto';
import { roleTypes } from '../config/role';
import { sequelize } from '../models';
import { initModels } from '../models/init-models';

import { Op } from 'sequelize';

const model = initModels(sequelize);

const getAll = async (options: optionsUser, keyword: string) => {
  let data;

  if (keyword) {
    data = await model.user.findAndCountAll({
      where: {
        [Op.or]: [
          {
            full_name: {
              [Op.like]: `%${keyword}%`,
            },
          },
          {
            email: {
              [Op.like]: `%${keyword}%`,
            },
          },
        ],
      },
      ...options,
    });
  } else {
    data = await model.user.findAndCountAll({
      ...options,
    });
  }

  return data;
};

const create = async (full_name: string, email: string, pass_word: string) => {
  const existingUser = await model.user.findOne({ where: { email } });
  if (existingUser) {
    throw new Error('Email already exists');
  }

  const newUser = await model.user.create({
    full_name: full_name,
    email,
    pass_word: bcrypt.hashSync(pass_word, 10),
    role: roleTypes.ROLE_USER,
  });

  return newUser;
};

const update = async (food_id: number, full_name: string, pass_word: string) => {};

export { getAll, create, update };
