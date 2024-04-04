import moment from 'moment-timezone';
import User from '../models/user.model.js';
import { literal } from 'sequelize';

async function createUser(newUser) {
  try {
    console.log(newUser);
    return await User.create(newUser);
  } catch (err) {
    throw err;
  }
}

async function getUserByUsername(username) {
  try {
    return await User.findOne({
      where: { username: username },
    });
  } catch (err) {
    throw err;
  }
}

async function incrementLoginAttempts(userId) {
  return await User.increment('loginAttempts', { where: { userId } });
}

async function resetLoginAttempts(userId) {
  return await User.update({ loginAttempts: 0 }, { where: { userId } });
}

async function lockAccount(userId, userTimezone) {
  const lockoutTime = moment()
    .add(15, 'minutes')
    .tz(userTimezone, true)
    .format('YYYY-MM-DD HH:mm:ss');
  return await User.update(
    {
      isLocked: true,
      lockoutTime: literal(`'${lockoutTime}'::timestamp`),
    },
    { where: { userId } }
  );
}

async function unlockAccount(userId) {
  return await User.update({ isLocked: false, lockoutTime: null }, { where: { userId } });
}

export default {
  createUser,
  getUserByUsername,
  incrementLoginAttempts,
  resetLoginAttempts,
  lockAccount,
  unlockAccount,
};
