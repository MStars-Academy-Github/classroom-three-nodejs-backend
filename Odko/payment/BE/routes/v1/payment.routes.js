const express = require("express");
const router = express.Router();

const paymentController = require("../../modules/payment");
router.post("/", paymentController.payment);

module.exports = router;
