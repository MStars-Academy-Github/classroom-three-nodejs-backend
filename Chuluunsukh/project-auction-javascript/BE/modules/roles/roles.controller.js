const rolesServices = require("./roles.services");

const getRoles = async (req, res, next) => {
  try {
    const roles = await rolesServices.getAll(req);
    res.json({
      data: roles,
    });
  } catch (err) {
    console.error(err.messeage);
    next(err);
  }
};

const createRoles = async (req, res, next) => {
  try {
    const role = rolesServices.createRole(req.body);
    res.json({
      data: role,
    });
  } catch (err) {
    console.error(err.messeage);
    next(err);
  }
};

const updateRoles = async (req, res) => {
  const role = await rolesServices.updateRoles(req);
  res.json({
    data: role,
  });
};

const deleteRoles = async (req, res) => {
  try {
    const role = rolesServices.deleteRoles(req);
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

const getById = async (req, res) => {
  const role = await rolesServices.getById(req);
  res.json({
    data: "get by id",
  });
};

module.exports = { getRoles, createRoles, updateRoles, deleteRoles, getById };
