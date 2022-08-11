const express = require("express");
const router = express.Router();
const foods = require("../service/users");

router.get("/", async (req, res, next) => {
  try {
    res.json(await foods.getAllUsers());
  } catch (err) {
    console.log(err.message);
    next(err);
  }
});
router.post("/add-user", async (req, res, next) => {
  try {
    const params = req.body;
    res.json(await foods.createUsers(params));
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});
router.delete("/delete", async (req, res, next) => {
  try {
    const params = req.body;
    console.log(params);
    res.json(await users.deleteUser(params));
  } catch (err) {
    console.log(err);
    next(err);
  }
});
router.put("/update-user", async (req, res, next) => {
  const params = req.body;
  try {
    res.json(await users.updateUser(params));
  } catch (err) {
    console.log(err.message);
    next(err);
  }
});

module.exports = router;
