const express = require("express");

const router = express.Router();

const categoreis = require("../service/categories");

router.get("/", async (req, res, next) => {
  try {
    res.json(await categoreis.getAllCategories());
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});
router.post("/add", async (req, res, next) => {
  try {
    const params = req.body;
    res.json(await categoreis.createCategory(params));
  } catch (err) {
    console.log(err);
    next(err);
  }
});
router.delete("/delete", async (req, res, next) => {
  try {
    const params = req.body;
    res.json(await categoreis.deleteCategory(params));
  } catch (err) {
    console.log(err);
    next(err);
  }
});
router.put("/update", async (req, res, next) => {
  try {
    const params = req.body;
    res.json(await categoreis.updateCategory(params));
  } catch (err) {
    console.error(err);
    next(err);
  }
});
module.exports = router;
