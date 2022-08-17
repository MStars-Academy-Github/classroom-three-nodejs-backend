const express = require("express");
const router = express.Router();
const usersRole = require("../services/usersRole");

router.get("/", async (req, res, next) => {
  try {
    res.json(await usersRole.getAllUsersRole());
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});
router.put("/update", async (req, res, next) => {
  try {
    const params = req.body;
    res.json(await usersRole.updateRole(params));
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});

module.exports = router;
