const boardsRepo = require('./board.memory.repository');
const tasksRepo = require('../tasks/task.memory.repository');

const getAll = () => boardsRepo.getAll();
const getBoard = id => boardsRepo.getBoard(id);
const addBoard = board => boardsRepo.addBoard(board);
const deleteBoard = async id => {
  tasksRepo.deleteAll(id);
  return boardsRepo.deleteBoard(id);
};

const editBoard = (id, boardInfo) => boardsRepo.editBoard(id, boardInfo);

module.exports = { getAll, getBoard, addBoard, deleteBoard, editBoard };
