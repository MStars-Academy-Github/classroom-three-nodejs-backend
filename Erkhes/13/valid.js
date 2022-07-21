const { body, validationResult } = require("express-validator");

const userValid = () => {
  return [
    body("email").isEmail(),
    body("registerID").isLength({ min: 10, max: 10 }),
    body("phone").isInt().isLength({ min: 8, max: 8 }),
    body("name").isString().matches(/(\w)/).withMessage("name must be letters"),
    body("password")
      .isLength({ min: 5 })
      .matches(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/)
      .withMessage(
        "password must contain minimum of 6 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number with no spaces."
      ),
    body("passValid").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password must be matched ");
      }
      return true;
    }),
  ];
};
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  }
  const extractedErrors = [];
  errors
    .array()
    .forEach((err) => extractedErrors.push({ [err.param]: err.msg }));
  //   console.log(errors);
  if (errors.length !== 0) {
    return res.status(400).json({
      errors: extractedErrors,
    });
  }
};
module.exports = { userValid, validate };
