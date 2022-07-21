const { body, validation, validationResult } = require("express-validator");

const userValidation = () => {
  return [
    body("email").isEmail(),
    body("regiter").isLength({ min: 10, max: 10 }),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  }

  const extracteErrors = [];
  errors.array().map((err) => extracteErrors.push({ [err.param]: err.msg }));
  return res.status(400).json({
    errors: extracteErrors,
  });
};

module.exports = { userValidation, validate };
