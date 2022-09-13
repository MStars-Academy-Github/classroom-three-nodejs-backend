const express = require("express");
const router = express.Router();
const rolesRoutes = require("../v1/roles.routes");

router.use("/roles", rolesRoutes);

module.exports = router;
