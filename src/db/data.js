const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');

const users = [
  new User({ name: 'user1', login: 'admin', password: 'admin', _id: '1' }),
  new User({ name: 'user2', login: 'Ann555', password: 'password', _id: '2' }),
  new User({
    name: 'user3',
    login: 'Valentine',
    password: 'paSSword',
    _id: '3'
  }),
  new User({
    name: 'user4',
    login: 'LOOOGIN',
    password: 'PAAAAAssWOOOOrd',
    _id: '4'
  })
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

const tasks = [
  new Task({
    title: 'task1',
    order: 1,
    description: 'description',
    userId: '1',
    boardId: '1',
    columnId: '1'
  }),
  new Task({
    title: 'task2',
    order: 2,
    description: 'description',
    userId: '1',
    boardId: '1',
    columnId: '1'
  }),
  new Task({
    title: 'task3',
    order: 3,
    description: 'description',
    userId: null,
    boardId: '2',
    columnId: '1'
  }),
  new Task({
    title: 'task4',
    order: 4,
    description: 'description',
    userId: null,
    boardId: '2',
    columnId: '1'
  })
];

module.exports = { users, boards, tasks };
