const User = require('../resources/users/user.model');

const users = [
  new User({ name: 'user1', login: 'admin', password: 'admin' }),
  new User({ name: 'user2', login: 'Ann555', password: 'password' }),
  new User({ name: 'user3', login: 'Valentine', password: 'paSSword' }),
  new User({ name: 'user4', login: 'LOOOGIN', password: 'PAAAAAssWOOOOrd' })
];

const connectToDB = cb => {
  const mongoose = require('mongoose');
  const { MONGO_CONNECTION_STRING } = require('../common/config');

  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', async () => {
    console.log("we're connected!");
    await db.dropDatabase();
    users.forEach(user => user.save());
    cb();
  });
};

module.exports = { connectToDB };
