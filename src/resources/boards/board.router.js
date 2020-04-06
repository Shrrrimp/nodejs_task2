const router = require('express').Router();
const boardsService = require('./board.service');
const schema = require('./board.schema');
const uuid = require('uuid');
const validate = require('../../helpers/validation');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();

  res.json(boards);
});

router.route('/:id').get(async (req, res) => {
  const id = req.params.id;
  const board = await boardsService.getBoard(id);

  if (board === undefined) {
    res.status(404).json({ message: `Board with id ${id} is not found` });
  }
  res.json(board);
});

router.post('/', validate.validateSchema(schema.postBoard), (req, res) => {
  const board = req.body;

  board.id = uuid();
  board.columns.forEach(column => {
    column.id = uuid();
  });

  boardsService.addBoard(board);
  res.json(board);
});

router.route('/:id').delete(async (req, res) => {
  const id = req.params.id;
  const isDeleted = await boardsService.deleteBoard(id);

  if (!isDeleted) {
    res.status(404).json({ message: `Board with id ${id} is not found` });
  } else {
    res.sendStatus(204);
  }
});

router.put(
  '/:id',
  validate.validateSchema(schema.putBoard),
  async (req, res) => {
    const id = req.params.id;
    const boardInfo = req.body;

    const board = await boardsService.editBoard(id, boardInfo);

    if (board === undefined) {
      res.status(404).json({ message: `Board with id ${id} is not found` });
    }
    res.json(board);
  }
);

module.exports = router;
