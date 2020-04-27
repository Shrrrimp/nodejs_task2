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
  return User.findByIdAndUpdate({ _id: id }, userInfo, {
    new: true,
    useFindAndModify: false
  });
};

const deleteUser = async id => {
  return (await User.deleteOne({ _id: id })).deletedCount;
};

const isLoginExist = async login => {
  const user = await User.findOne({ login }).exec();
  if (user) return true;
  return false;
};

module.exports = {
  getAll,
  getUser,
  addUser,
  editUser,
  deleteUser,
  isLoginExist
};
