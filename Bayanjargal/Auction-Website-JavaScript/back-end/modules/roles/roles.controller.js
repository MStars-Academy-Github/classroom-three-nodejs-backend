const Roles = require("./role.model");
const rolesService = require("./roles.services");
const createRole = async (req, res) => {
  const role = await rolesService.createRole(req);
  try {
    res.send({
      data: role,
    });
  } catch (err) {
    res.json({
      error: err,
    });
  }
};

const updateRole = async (req, res) => {
  await rolesService.updateRole(req);
  const role = await Roles.findById(id);

  console.log(role);

  res.json({
    data: role,
  });
};

const deleteRole = async (req, res) => {
  try {
    const role = await rolesService.deleteRole(req);
    res.json({
      success: true,
      data: role,
    });
  } catch (err) {
    res.json({
      success: false,
      data: err,
    });
  }
};

const getAll = async (req, res) => {
  const roles = await rolesService.getAll(req);
  res.json({
    data: roles,
  });
};
module.exports = { getAll, deleteRole, updateRole, createRole };
