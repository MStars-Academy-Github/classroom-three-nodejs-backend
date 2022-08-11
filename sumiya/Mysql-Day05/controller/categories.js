const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const categories = require("../service/categories");

router.get("/", auth, async (req, res, next) => {
  try {
    res.json(await categories.getAllCategories());
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});

router.post("/", auth, async (req, res, next) => {
  try {
    const params = req.body;
    console.log(params);
    res.json(await categories.createCategory(params));
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});
router.delete("/", async (req, res, next) => {
  try {
    const params = req.body;
    console.log(params);
    res.json(await categories.deleteCategory(params));
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});

router.put("/", async (req, res, next) => {
  try {
    console.log(req);
    const params = req.body;
    console.log(req.body);
    res.json(await categories.updateCategory(params));
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  console.log(req.params);
  console.log(id);
  try {
    res.json(await categories.getAllCategoryById(id));
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});

module.exports = router;
