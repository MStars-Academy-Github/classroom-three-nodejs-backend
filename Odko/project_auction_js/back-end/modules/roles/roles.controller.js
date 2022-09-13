const rolesService = require("./roles.services");

const getRoles = async (req, res, next) => {
  try {
    const getRoles = await rolesService.getRole();
    res.json({
      data: getRoles,
    });
  } catch (err) {
    console.error(err.messeage);
    next(err);
  }
};

const createRoles = async (req, res, next) => {
  try {
    const createRole = await rolesService.createRole(req);
    res.json({
      data: createRole,
    });
  } catch (err) {
    console.error(err.messeage);
    next(err);
  }
};

const updateRoles = async (req, res) => {
  try {
    const updateRole = await rolesService.updateRole(req);
    res.json({
      data: updateRole,
    });
  } catch (err) {
    console.error(err.messeage);
    next(err);
  }
};

const deleteRoles = async (req, res) => {
  try {
    const deleteRole = await rolesService.deleteRole(req);
    res.json({
      success: true,
      data: deleteRole,
    });
  } catch (err) {
    res.json({
      success: false,
      data: err,
    });
  }
};

module.exports = { getRoles, createRoles, updateRoles, deleteRoles };
