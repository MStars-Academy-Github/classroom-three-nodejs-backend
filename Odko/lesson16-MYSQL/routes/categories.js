const express = require("express");
const router = express.Router();

const categories = require("../services/categories");

router.get("/", async (req, res, next) => {
  try {
    res.json(await categories.getAllCategories());
  } catch (err) {
    console.error(err.messeage);
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const params = req.body;
    res.json(await categories.createCategory(params));
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});

module.exports = router;
