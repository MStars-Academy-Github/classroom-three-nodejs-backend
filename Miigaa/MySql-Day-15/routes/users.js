const express = require("express");
const router = express.Router();
const users = require("../services/user");

router.get("/", async (req, res, next) => {
  try {
    res.json(await users.getAllUser());
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});
router.post("/add", async (req, res, next) => {
  try {
    const params = req.body;
    res.json(await users.createUser(params));
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});
router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    res.json(await users.getUserById(id));
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});
router.put("/update", async (req, res, next) => {
  try {
    const params = req.body;
    res.json(await users.updateUser(params));
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});
router.delete("/delete", async (req, res, next) => {
  try {
    const params = req.body;
    res.json(await users.deleteUser(params));
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});
module.exports = router;
