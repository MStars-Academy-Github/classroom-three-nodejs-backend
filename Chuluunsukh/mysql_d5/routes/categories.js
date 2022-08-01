const express = require("express");
const router = express.Router();
const categories = require("../categories");

router.get("/", async (req, res, next) => {
  try {
    res.json(await categories.getAllCategories());
  } catch (err) {
    console.log(err.message);
    next(err);
  }
});

module.exports = router;
