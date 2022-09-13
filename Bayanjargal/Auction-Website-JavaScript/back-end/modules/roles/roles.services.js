const Roles = require("./role.model");

const createRole = (req) => {
  const roles = new Roles(req.body);
  return roles.save();
};
const getAll = (req) => {
  return Roles.find();
};
const updateRole = (req) => {
  const { id } = req.params;
  return Roles.findByIdAndUpdate(id, req.body);
};
const deleteRole = (req) => {
  const { id } = req.params;
  return Roles.findByIdAndDelete(id);
};
module.exports = { createRole, getAll, updateRole, deleteRole };
