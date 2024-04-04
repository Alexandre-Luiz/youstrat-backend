import userRepository from '../repositories/user.repository.js';

async function createUser(newUser) {
  return await userRepository.createUser(newUser);
}

async function getUserByUsername(username) {
  return await userRepository.getUserByUsername(username);
}

async function incrementLoginAttempts(userId) {
  return await userRepository.incrementLoginAttempts(userId);
}

async function resetLoginAttempts(userId) {
  return await userRepository.resetLoginAttempts(userId);
}

async function lockAccount(userId, userTimezone) {
  return await userRepository.lockAccount(userId, userTimezone);
}

async function unlockAccount(userId) {
  return await userRepository.unlockAccount(userId);
}

export default {
  createUser,
  getUserByUsername,
  incrementLoginAttempts,
  resetLoginAttempts,
  lockAccount,
  unlockAccount,
};
