const router = require('express').Router();
// const Board = require('./board.model');
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

router.post('/', validate.validateSchema(schema), (req, res) => {
  const board = req.body;
  console.log(board);

  board.id = uuid();
  board.columns.forEach(column => {
    column.id = uuid();
  });
  console.log(board);
  boardsService.addUser(board);

  res.json(board);
});

// router.put('/:id', validate.validateSchema(schema), async (req, res) => {
//   const id = req.params.id;
//   const userInfo = req.body;

//   const user = await usersService.editUser(id, userInfo);

//   if (user === undefined) {
//     res.status(404).json({ message: `User with id ${id} is not found` });
//   }
//   res.json(User.toResponse(user));
// });

module.exports = router;
