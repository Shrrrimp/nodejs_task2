const User = require('./user.model');

const users = [
  new User(),
  new User('1', 'Ann', 'Ann555', 'password'),
  new User('2', 'Valentine', 'Rat', 'paSSword'),
  new User('3', 'Alex', 'LOOOGIN', 'PAAAAAssWOOOOrd')
];

const getAll = async () => {
  return users;
};

const getUser = async id => {
  return users.find(user => user.id === id);
};

const addUser = user => {
  users.push(user);
};

const editUser = async (id, userInfo) => {
  let edited;

  users.map(user => {
    if (user.id === id) {
      user.name = userInfo.name;
      user.login = userInfo.login;
      user.password = userInfo.password;

      edited = user;
    }
  });

  return edited;
};

const deleteUser = async id => {
  const toDelete = users.find(user => user.id === id);
  if (!toDelete) return false;

  const index = users.indexOf(toDelete);
  users.splice(index, 1);
  return true;
};

module.exports = { getAll, getUser, addUser, editUser, deleteUser };
