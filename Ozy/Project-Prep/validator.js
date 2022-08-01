const { body, validationResult } = require("express-validator");

const userValidationRules = () => {
  return [
    body("isbn").isLength({ min: 10, max: 13 }).withMessage("Only numbers"),
    body("title").isString().withMessage("Only letters"),
    body("subtitle").isString().withMessage("Only letters"),
    body("author").isString().withMessage("Only letters"),
    body("published").isDate().withMessage("Enter Date"),
    body("publisher").isString().withMessage("Only letters"),
    body("pages").isInt().withMessage("Only numbers"),
    body("description").isString().withMessage("Only letters"),
    body("website").isString().withMessage("Only letters"),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  }

  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.render("errors", {
    errors: extractedErrors,
  });
};

module.exports = { userValidationRules, validate };
