const express = require("express");
const router = express.Router();
const rolesController = require("../../modules/roles");

router.get("/", rolesController.getRoles);
router.get("/:id", rolesController.getById);
router.post("/", rolesController.createRoles);
router.put("/", rolesController.updateRoles);
router.delete("/:id", rolesController.deleteRoles);

module.exports = router;
