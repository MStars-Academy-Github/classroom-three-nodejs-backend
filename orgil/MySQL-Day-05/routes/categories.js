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

router.post("/add", async (req, res, next) => {
  try {
    const params = req.body;
    res.json(await categories.createCategory(params));
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});

router.delete("/delete", async (req, res, next) => {
  try {
    const params = req.body;
    console.log(params);
    res.json(await categories.deleteCategory(params));
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});

router.put("/update", async (req, res, next) => {
  try {
    const params = req.body;
    res.json(await categories.updateCategory(params));
  } catch (err) {
    console.err(err.message);
    next(err);
  }
});
module.exports = router;
