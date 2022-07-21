const { body, validationResult } = require("express-validator");

const userValidationRules = () => {
  return [body("phone").isLength({ min: 8, max: 8 })];
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

module.exports = { userValidationRules, validate };
