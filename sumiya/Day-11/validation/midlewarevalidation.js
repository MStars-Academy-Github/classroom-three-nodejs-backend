const { body, validationResult } = require("express-validator");
const userValidationRules = () => {
  return [
    body("email").isEmail(),
    //   body("register").isLength({ min: 10, max: 10 }),
    body("phone", "Invalid mobile number.")
      .matches(/\d/)
      .isLength({ min: 8, max: 8 }),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
  return res.status(400).json({ errors: extractedErrors });
};

module.exports = { userValidationRules, validate };
