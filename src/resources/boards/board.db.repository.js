const Board = require('./board.model');

const getAll = async () => {
  return Board.find({});
};

const getBoard = async id => {
  return Board.findById(id);
};

const addBoard = board => {
  return Board.create(board);
};

const deleteBoard = async id => {
  return (await Board.deleteOne({ _id: id })).deletedCount;
};

const editBoard = async (id, boardInfo) => {
  return Board.findByIdAndUpdate(id, boardInfo, {
    new: true,
    useFindAndModify: false
  });
};

module.exports = { getAll, getBoard, addBoard, deleteBoard, editBoard };
