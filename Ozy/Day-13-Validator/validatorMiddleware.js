const { body, validationResult, check } = require("express-validator");

const userValidationRules = () => {
  return [
    body("email").isEmail(),
    body("register").isLength({ min: 10, max: 10 }),
    body("phone")
      .isNumeric()
      .isLength({ min: 8, max: 8 })
      .withMessage("only phone number"),
    check("password")
      .isLength({ min: 8 })
      .matches(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/)
      .withMessage(
        "Checks that a password has a minimum of 6 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number with no spaces."
      ),
    check("name")
      .matches(/^[a-zA-Z]+$/)
      .withMessage("Name must only string"),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  }

  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(400).json({
    errors: extractedErrors,
  });
};

module.exports = { userValidationRules, validate };
