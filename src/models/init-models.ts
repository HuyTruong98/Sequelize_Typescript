import { Sequelize } from 'sequelize';
import { Food } from './food';
import { FoodType } from './food_type';
import { LikeRes } from './like_res';
import { Order } from './order';
import { RateRes } from './rate_res';
import { Restaurant } from './restaurant';
import { SubFood } from './sub_food';
import { User } from './user';
import { VerificationCode } from './verification_codes';

export function initModels(sequelize: Sequelize) {
  const food = Food.initTable(sequelize);
  const food_type = FoodType.initTable(sequelize);
  const like_res = LikeRes.initTable(sequelize);
  const order = Order.initTable(sequelize);
  const rate_res = RateRes.initTable(sequelize);
  const restaurant = Restaurant.initTable(sequelize);
  const sub_food = SubFood.initTable(sequelize);
  const user = User.initTable(sequelize);
  const verification_codes = VerificationCode.initTable(sequelize);

  food.belongsToMany(user, { as: 'user_id_user_orders', through: order, foreignKey: 'food_id', otherKey: 'user_id' });
  restaurant.belongsToMany(user, { as: 'user_id_users', through: like_res, foreignKey: 'res_id', otherKey: 'user_id' });
  restaurant.belongsToMany(user, {
    as: 'user_id_user_rate_res',
    through: rate_res,
    foreignKey: 'res_id',
    otherKey: 'user_id',
  });
  user.belongsToMany(food, { as: 'food_id_foods', through: order, foreignKey: 'user_id', otherKey: 'food_id' });
  user.belongsToMany(restaurant, {
    as: 'res_id_restaurants',
    through: like_res,
    foreignKey: 'user_id',
    otherKey: 'res_id',
  });
  user.belongsToMany(restaurant, {
    as: 'res_id_restaurant_rate_res',
    through: rate_res,
    foreignKey: 'user_id',
    otherKey: 'res_id',
  });
  order.belongsTo(food, { as: 'food', foreignKey: 'food_id' });
  food.hasMany(order, { as: 'orders', foreignKey: 'food_id' });
  sub_food.belongsTo(food, { as: 'food', foreignKey: 'food_id' });
  food.hasMany(sub_food, { as: 'sub_foods', foreignKey: 'food_id' });
  food.belongsTo(food_type, { as: 'type', foreignKey: 'type_id' });
  food_type.hasMany(food, { as: 'foods', foreignKey: 'type_id' });
  like_res.belongsTo(restaurant, { as: 're', foreignKey: 'res_id' });
  restaurant.hasMany(like_res, { as: 'like_res', foreignKey: 'res_id' });
  rate_res.belongsTo(restaurant, { as: 're', foreignKey: 'res_id' });
  restaurant.hasMany(rate_res, { as: 'rate_res', foreignKey: 'res_id' });
  like_res.belongsTo(user, { as: 'user', foreignKey: 'user_id' });
  user.hasMany(like_res, { as: 'like_res', foreignKey: 'user_id' });
  order.belongsTo(user, { as: 'user', foreignKey: 'user_id' });
  user.hasMany(order, { as: 'orders', foreignKey: 'user_id' });
  rate_res.belongsTo(user, { as: 'user', foreignKey: 'user_id' });
  user.hasMany(rate_res, { as: 'rate_res', foreignKey: 'user_id' });

  return {
    food,
    food_type,
    like_res,
    order,
    rate_res,
    restaurant,
    sub_food,
    user,
    verification_codes,
  };
}
