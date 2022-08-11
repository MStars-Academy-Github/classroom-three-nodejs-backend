const express = require("express");
const router = express.Router();

const users = require("../services/users");

router.get("/", async (req, res, next) => {
  try {
    res.json(await users.getUserJoinRoles());
  } catch (err) {
    console.error(err.messeage);
    next(err);
  }
});

router.delete("/", async (req, res, next) => {
  try {
    const params = req.query;
    res.json(await users.deleteUsers(params));
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const params = req.body;
    res.json(await users.createUsers(params));
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    res.json(await users.getUsersById(id));
  } catch (err) {
    console.error(error.message);
    next(error);
  }
});

router.put("/", async (req, res, next) => {
  try {
    const params = req.body;

    res.json(await users.updateUsers(params));
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});

module.exports = router;
