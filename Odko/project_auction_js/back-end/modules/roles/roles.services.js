const Roles = require("./role.model");

const getRole = async () => {
  const roles = await Roles.find();
  return roles;
};

const createRole = async (req) => {
  const roles = new Roles(req.body);
  const role = await roles.save();
  return role;
};

const updateRole = async (req) => {
  const { id } = req.query;
  await Roles.findByIdAndUpdate(id, req.body);
  const role = await Roles.findById(id);
  return role;
};

const deleteRole = async (req) => {
  const { id } = req.params;
  const role = await Roles.findByIdAndDelete(id);
  return role;
};

module.exports = { createRole, getRole, updateRole, deleteRole };
