const express = require("express");
const router = express.Router();
const rolesRoute = require("../v1/roles.routes");
router.use("/roles", rolesRoute);
module.exports = router;
