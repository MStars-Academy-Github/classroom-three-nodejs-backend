const { body, validationResult } = require("express-validator");
const userValidationRules = () => {
  return [
    body("name").isAlpha(),
    body("register").isLength({ min: 10, max: 10 }),
    body("phone").isLength({ min: 8, max: 8 }),
    body("password").isStrongPassword(),
  ];
};
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  }
  const extractedErrors = [];
  errors.array().map((err) => {
    extractedErrors.push({ [err.param]: err.msg });
  });
  return res.status(400).json({ errors: extractedErrors });
};
module.exports = { userValidationRules, validate };
