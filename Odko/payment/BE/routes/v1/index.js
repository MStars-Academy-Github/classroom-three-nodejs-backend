const express = require("express");
const router = express.Router();
const paymentRoute = require("./payment.routes");

router.use("/payment", paymentRoute);

module.exports = router;
