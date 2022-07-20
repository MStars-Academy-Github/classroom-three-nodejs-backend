const { body, validationResult } = require("express-validator");

const userValidationRules = () => {
  return [
    body("email").isEmail(),
    body("register").isLength({ min: 10, max: 10 }),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next();
  }

  const exractedErrors = [];
  errors.array().map((err) => exractedErrors.push({ [err.param]: err.msg }));

  return res.status(400).json({ errors: exractedErrors });
};

module.exports = { userValidationRules, validate };
