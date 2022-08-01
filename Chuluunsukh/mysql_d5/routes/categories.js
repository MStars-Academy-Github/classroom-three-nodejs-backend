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

router.post("/", async (req, res, next) => {
  try {
    const params = req.body;
    res.json(await categories.createCategory());
  } catch (error) {
    console.error(error.message);
    next.error;
  }
});
module.exports = router;
