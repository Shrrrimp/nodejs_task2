const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const schema = require('./user.schema');
// const uuid = require('uuid');
const validate = require('../../helpers/validation');
const { ErrorHandler } = require('../../helpers/error-handler');
const { catchErrors } = require('../../helpers/catch-errors');

router.route('/').get(
  catchErrors(async (req, res) => {
    const users = await usersService.getAll();
    if (!users.length) {
      throw new ErrorHandler(401, 'Access token is missing or invalid');
    }

    res.json(users.map(User.toResponse));
  })
);

router.route('/:id').get(
  catchErrors(async (req, res) => {
    const id = req.params.id;
    const user = await usersService.getUser(id);

    if (!user) {
      throw new ErrorHandler(404, `User with id ${id} is not found`);
    }
    res.json(User.toResponse(user));
    res.json(user);
  })
);

router.post(
  '/',
  validate.validateSchema(schema.postSchema),
  async (req, res) => {
    // user.id = uuid();
    const user = await usersService.addUser(req.body);

    res.json(User.toResponse(user));
  }
);

router.put(
  '/:id',
  validate.validateSchema(schema.putSchema),
  catchErrors(async (req, res) => {
    const id = req.params.id;
    const userInfo = req.body;

    const user = await usersService.editUser(id, userInfo);

    if (user === undefined) {
      throw new ErrorHandler(404, `User with id ${id} is not found`);
    }
    res.json(User.toResponse(user));
  })
);

router.route('/:id').delete(
  catchErrors(async (req, res) => {
    const id = req.params.id;
    const isDeleted = await usersService.deleteUser(id);

    if (!isDeleted) {
      throw new ErrorHandler(404, `User with id ${id} is not found`);
    } else {
      res.sendStatus(204);
    }
  })
);

module.exports = router;
