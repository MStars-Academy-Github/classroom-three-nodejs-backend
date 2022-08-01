const { validationResult,body } = require("express-validator");

const userValidationRules = () => {
  return [
    body("isbn","invalid numbers").isLength({ min: 10, max: 13 }).notEmpty(),
    body("title","invalid letters").isString().notEmpty(),
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
module.exports = {
  userValidationRules,
  validate
}