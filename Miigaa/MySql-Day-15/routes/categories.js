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
router.post("/", async (req, res, next) => {
  try {
    const params = req.body;
    res.json(await categories.createCategory(params));
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});
router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    res.json(await categories.getCategoryById(id));
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});
router.delete("/", async (req, res, next) => {
  try {
    const params = req.body;
    res.json(await categories.deleteCategory(params));
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});
router.put("/", async (req, res, next) => {
  try {
    const params = req.body;
    res.json(await categories.updateCategory(params));
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});
module.exports = router;
