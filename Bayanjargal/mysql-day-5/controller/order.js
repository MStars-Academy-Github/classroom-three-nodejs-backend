const express = require("express");

const router = express.Router();
const transaction = require("../service/transaction");
router.get("/", (req, res, next) => {
  transaction.createOrder();
});
module.exports = router;
