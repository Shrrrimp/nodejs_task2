const Board = require('./board.model');

const boards = [
  new Board.Board(),
  new Board.Board('1', 'board1', [
    new Board.Column('1', 'column1', 0),
    new Board.Column('2', 'column2', 1),
    new Board.Column('3', 'column3', 2)
  ]),
  new Board.Board('2', 'board2', [
    new Board.Column('1', 'column1', 0),
    new Board.Column('2', 'column2', 1)
  ]),
  new Board.Board('3', 'board3', [
    new Board.Column('1', 'column1', 0),
    new Board.Column('2', 'column2', 1),
    new Board.Column('3', 'column3', 2),
    new Board.Column('4', 'column4', 3)
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

const deleteBoard = async id => {
  const toDelete = boards.find(board => board.id === id);
  if (!toDelete) return false;

  const index = boards.indexOf(toDelete);
  boards.splice(index, 1);
  return true;
};

const editBoard = async (id, boardInfo) => {
  const toEdit = await getBoard(id);
  if (!toEdit) return toEdit;

  toEdit.id = boardInfo.id;
  toEdit.title = boardInfo.title;
  toEdit.columns = boardInfo.columns;

  return toEdit;
};

module.exports = { getAll, getBoard, addBoard, deleteBoard, editBoard };
