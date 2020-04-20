const usersRepo = require('./user.db.repository');
const taskService = require('../tasks/task.service');

const getAll = () => usersRepo.getAll();
const getUser = id => usersRepo.getUser(id);
const addUser = user => usersRepo.addUser(user);
const editUser = (id, userInfo) => usersRepo.editUser(id, userInfo);
const deleteUser = async id => {
  await taskService.updateUserInfo(id);
  return usersRepo.deleteUser(id);
};

module.exports = { getAll, getUser, addUser, editUser, deleteUser };
