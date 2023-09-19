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

const getById = async (id: number) => {
  const currentUser = await model.user.findOne({ where: { user_id: id } });

  if (currentUser) {
    return currentUser.dataValues;
  } else {
    throw new Error('User does not exist !');
  }
};

const updateById = async (user_id: number, full_name: string, pass_word: string) => {
  const currentUser = await getById(user_id);
  const body = {
    ...currentUser,
    full_name,
    pass_word: bcrypt.hashSync(pass_word, 10),
  };
  if (body) {
    const updateUser = await model.user.update(body, {
      where: {
        user_id,
      },
    });
    return updateUser;
  }
};

const deleteById = async (user_id: number) => {
  const currentUser = await model.user.destroy({
    where: {
      user_id,
    },
  });
  if (currentUser) return true;
};

export { getAll, create, updateById, deleteById };
