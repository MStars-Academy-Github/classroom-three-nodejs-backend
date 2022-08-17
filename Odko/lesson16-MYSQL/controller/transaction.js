const express = require("express");
const router = express.Router();

const transaction = require("../services/transaction");

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
    res.json(await transaction.createOrder());
  } catch (err) {
    console.error(err.messeage);
    next(err);
  }
});
module.exports = router;
