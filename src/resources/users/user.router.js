const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const schema = require('./user.schema');
const uuid = require('uuid');
const validate = require('../../helpers/validation');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();

  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const id = req.params.id;
  const user = await usersService.getUser(id);

  if (user === undefined) {
    res.status(404).json({ message: `User with id ${id} is not found` });
  }
  res.json(User.toResponse(user));
});

router.post('/', validate.validateSchema(schema.postSchema), (req, res) => {
  const user = req.body;
  user.id = uuid();
  usersService.addUser(user);

  res.json(User.toResponse(user));
});

router.put(
  '/:id',
  validate.validateSchema(schema.putSchema),
  async (req, res) => {
    const id = req.params.id;
    const userInfo = req.body;

    const user = await usersService.editUser(id, userInfo);

    if (user === undefined) {
      res.status(404).json({ message: `User with id ${id} is not found` });
    }
    res.json(User.toResponse(user));
  }
);

router.route('/:id').delete(async (req, res) => {
  const id = req.params.id;
  const isDeleted = await usersService.deleteUser(id);

  if (!isDeleted) {
    res.status(404).json({ message: `User with id ${id} is not found` });
  } else {
    res.sendStatus(204);
  }
});

module.exports = router;
