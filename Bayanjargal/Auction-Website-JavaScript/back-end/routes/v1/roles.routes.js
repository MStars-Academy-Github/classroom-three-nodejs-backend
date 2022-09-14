const express = require("express");
const router = express.Router();
const rolesController = require("../../modules/roles/index");
router.get("/", rolesController.getAll);
router.get("/:id", rolesController.getById);
router.post("/", rolesController.createRole);
router.put("/:id", rolesController.updateRole);
router.delete("/:id", rolesController.deleteRole);
module.exports = router;
