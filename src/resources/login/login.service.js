const User = require('../users/user.model');

const checkCredentials = async (login, password) => {
  const user = await User.findByCredentials(login, password);
  return user;
};

module.exports = { checkCredentials };
