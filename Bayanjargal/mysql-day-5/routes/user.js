const express = require("express");
const users = require("../service/user");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    res.json(await users.getAllUser());
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});
router.post("/adduser", async (req, res, next) => {
  const params = req.body;
  try {
    res.json(await users.createUser(params));
  } catch (err) {
    console.log(err.message);
    next(err);
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
router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    res.json(await users.getUserById(id));
  } catch (err) {
    console.error(err);
    next(err);
  }
});
module.exports = router;
