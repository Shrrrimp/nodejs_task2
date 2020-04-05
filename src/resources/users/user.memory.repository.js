const User = require('./user.model');
const uuid = require('uuid');

// TODO: PUT
// TODO: DELETE

const users = [
  new User(),
  new User(uuid(), 'Ann', 'Ann555', 'password'),
  new User(uuid(), 'Valya', 'Rat', 'paSSword'),
  new User(uuid(), 'Alex', 'LOOOGIN', 'PAAAAAssWOOOOrd')
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

module.exports = { getAll, getUser, addUser, editUser };
