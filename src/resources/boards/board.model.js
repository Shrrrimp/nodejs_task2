const uuid = require('uuid');
const mongoose = require('mongoose');

const columnSchema = new mongoose.Schema(
  {
    id: { type: String, default: uuid },
    title: String,
    order: Number
  },
  { versionKey: false }
);

const boardSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuid
    },
    title: String,
    columns: [columnSchema]
  },
  { versionKey: false }
);

const columnsToResponse = columns => {
  return columns.map(column => {
    const { id, title, order } = column;
    return { id, title, order };
  });
};

boardSchema.statics.toResponse = board => {
  const { id, title } = board;
  const columns = columnsToResponse(board.columns);
  return { id, title, columns };
};

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
