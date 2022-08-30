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
router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    res.json(await categories.getCategoryById(id));
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});
router.post("/", async (req, res, next) => {
  try {
    const params = req.body;
    res.json(await categories.createCategory(params));
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});
router.delete("/delete", async function (req, res, next) {
  try {
    const params = req.body;
    res.json(await categories.deleteCategory(params));
  } catch (err) {
    console.error(err.message), next(err);
  }
});
router.put("/update", async function (req, res, next) {
  try {
    const params = req.body;
    res.json(await categories.updateCategory(params));
  } catch (err) {
    console.error(err.message), next(err);
  }
});
module.exports = router;
