const express = require("express");
const router = express.Router();

const categories = require("../services/categories");

router.get("/", async (req, res, next) => {
  try {
    res.json(await categories.getAllCategories());
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});

module.exports = router;
