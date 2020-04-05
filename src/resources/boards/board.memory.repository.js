const Board = require('./board.model');
const uuid = require('uuid');

const boards = [
  new Board.Board(),
  new Board.Board(uuid(), 'board1', [
    new Board.Column(uuid(), 'column1', 0),
    new Board.Column(uuid(), 'column2', 1),
    new Board.Column(uuid(), 'column3', 2)
  ]),
  new Board.Board(uuid(), 'board2', [
    new Board.Column(uuid(), 'column1', 0),
    new Board.Column(uuid(), 'column2', 1)
  ]),
  new Board.Board(uuid(), 'board3', [
    new Board.Column(uuid(), 'column1', 0),
    new Board.Column(uuid(), 'column2', 1),
    new Board.Column(uuid(), 'column3', 2),
    new Board.Column(uuid(), 'column4', 3)
  ])
];

const getAll = async () => {
  return boards;
};

const getBoard = async id => {
  return boards.find(board => board.id === id);
};

const addBoard = board => {
  boards.push(board);
};

module.exports = { getAll, getBoard, addBoard };
