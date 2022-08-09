const express = require("express");
const router = express.Router();

const foods = require("../services/users");

router.get("/", async (req, res, next) => {
  try {
    res.json(await foods.getAllUsers());
  } catch (err) {
    console.error(err.messeage);
    next(err);
  }
});

module.exports = router;
