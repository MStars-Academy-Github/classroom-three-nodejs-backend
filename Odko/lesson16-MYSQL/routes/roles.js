const express = require("express");
const router = express.Router();

const roles = require("../services/roles");

// router.get("/", async (req, res, next) => {
//   try {
//     res.json(await roles.getAllFood());
//   } catch (err) {
//     console.error(err.messeage);
//     next(err);
//   }
// });
router.get("/", async (req, res, next) => {
  try {
    res.json(await roles.getAllRoles());
  } catch (err) {
    console.error(err.messeage);
    next(err);
  }
});
router.delete("/", async (req, res, next) => {
  try {
    const params = req.query;

    res.json(await roles.deleteRoles(params));
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const params = req.body;

    res.json(await roles.createRoles(params));
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    res.json(await roles.getRolesById(id));
  } catch (err) {
    console.error(error.message);
    next(error);
  }
});

router.put("/", async (req, res, next) => {
  try {
    const params = req.body;
    res.json(await roles.updateRoles(params));
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});
module.exports = router;
