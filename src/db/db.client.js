const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');

const users = [
  new User({ name: 'user1', login: 'admin', password: 'admin' }),
  new User({ name: 'user2', login: 'Ann555', password: 'password' }),
  new User({ name: 'user3', login: 'Valentine', password: 'paSSword' }),
  new User({ name: 'user4', login: 'LOOOGIN', password: 'PAAAAAssWOOOOrd' })
];

const boards = [
  new Board({
    _id: '1',
    title: 'board1',
    columns: [
      { id: '1', title: 'column1', order: 1 },
      { id: '2', title: 'column2', order: 2 }
    ]
  }),
  new Board({
    _id: '2',
    title: 'board2',
    columns: [
      { title: 'column1', order: 1 },
      { title: 'column2', order: 2 },
      { title: 'column3', order: 3 }
    ]
  }),
  new Board({
    _id: '3',
    title: 'board3',
    columns: [
      { title: 'column1', order: 1 },
      { title: 'column2', order: 2 },
      { title: 'column3', order: 3 },
      { title: 'column4', order: 4 }
    ]
  }),
  new Board({
    _id: '4',
    title: 'board1',
    columns: []
  })
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
    boards.forEach(board => board.save());
    cb();
  });
};

module.exports = { connectToDB };
