const { body, validationResult } = require("express-validator");

const userValidationRules = () => {
  return [
    body("email").isEmail(),
    body("phone")
      .isLength({ min: 8, max: 8 })
      .matches(/\d/)
      .withMessage("Must be a number"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("8 aas ih orontoi bh ystoi")
      .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
      .withMessage("Password type is wrong"),
    body("name")
      .matches(/^[a-zA-Z]/)
      .withMessage("Must contain be a string"),
  ];
};
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
    return res.status(400).json({ errors: errors.array() });
  }
  const extractedErros = [validate];
  errors.array().map((err) => extractedErros.push({ [err.param]: err.msg }));
  return res.status(400).json({
    errors: extractedErros,
  });
};

module.exports = { userValidationRules, validate };
