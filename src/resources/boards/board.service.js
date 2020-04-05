const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();
const getBoard = id => boardsRepo.getBoard(id);
const addBoard = board => boardsRepo.addBoard(board);

module.exports = { getAll, getBoard, addBoard };
