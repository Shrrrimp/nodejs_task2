const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();
const getUser = id => usersRepo.getUser(id);
const addUser = user => usersRepo.addUser(user);
const editUser = (id, userInfo) => usersRepo.editUser(id, userInfo);

module.exports = { getAll, getUser, addUser, editUser };
