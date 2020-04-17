const User = require('./user.model');

const getAll = async () => {
  return User.find({});
};

const getUser = async id => {
  return User.findById(id);
};

const addUser = async user => {
  return User.create(user);
};

const editUser = async (id, userInfo) => {
  return User.updateOne({ _id: userInfo.id }, userInfo);
};

const deleteUser = async id => {
  return (await User.deleteOne({ _id: id })).deletedCount;
};

module.exports = { getAll, getUser, addUser, editUser, deleteUser };
