const usersRepo = require('./user.memory.repository');
const tasksRepo = require('../tasks/task.memory.repository');

const getAll = () => usersRepo.getAll();
const getUser = id => usersRepo.getUser(id);
const addUser = user => usersRepo.addUser(user);
const editUser = (id, userInfo) => usersRepo.editUser(id, userInfo);
const deleteUser = async id => {
  tasksRepo.updateUserInfo(id);
  return usersRepo.deleteUser(id);
};

module.exports = { getAll, getUser, addUser, editUser, deleteUser };
