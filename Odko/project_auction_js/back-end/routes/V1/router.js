const express = require("express");
const router = express.Router();

const rolesController = require("../../modules/roles/index");

router.get("/", rolesController.getRoles);
router.post("/", rolesController.createRoles);
router.put("/", rolesController.updateRoles);
router.delete("/:id", rolesController.deleteRoles);
router.get("/:id", rolesController.getById);

module.exports = router;
