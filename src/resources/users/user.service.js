/* eslint-disable require-atomic-updates */
const usersRepo = require('./user.db.repository');
const taskService = require('../tasks/task.service');
const bcrypt = require('bcrypt');
const { ErrorHandler } = require('../../helpers/error-handler');
const SALT_ROUNDS = 8;

const getAll = () => usersRepo.getAll();
const getUser = id => usersRepo.getUser(id);

const addUser = async user => {
  const isLoginAlreadyExist = await usersRepo.isLoginExist(user.login);
  if (isLoginAlreadyExist) {
    throw new ErrorHandler(409, 'The user with such login is already exist');
  }
  return usersRepo.addUser(user);
};

const editUser = async (id, userInfo) => {
  userInfo.password = await bcrypt.hash(userInfo.password, SALT_ROUNDS);
  return usersRepo.editUser(id, userInfo);
};

const deleteUser = async id => {
  await taskService.updateUserInfo(id);
  return usersRepo.deleteUser(id);
};

module.exports = { getAll, getUser, addUser, editUser, deleteUser };
