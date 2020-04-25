const router = require('express').Router();
const loginService = require('./login.service');
const schema = require('./login.schema');
const validate = require('../../helpers/validation');
const { catchErrors } = require('../../helpers/catch-errors');

router.post(
  '/',
  validate.validateSchema(schema.postSchema),
  catchErrors(async (req, res) => {
    console.log(req.body);
    const user = await loginService.checkCredentials(
      req.body.login,
      req.body.password
    );

    const token = await user.generateAuthToken();
    res.json(token);
  })
);

module.exports = router;
