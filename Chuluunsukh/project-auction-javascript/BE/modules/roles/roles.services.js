const Roles = require("./role.model");

const createRole = async (req) => {
  const roles = new Roles(req.body);
  console.log(roles);
  const role = await roles.save();
};

const getAll = async (req) => {
  return await Roles.find();
};

const updateRoles = async (req) => {
  console.log(req.body);
  console.log(req.query);
  const { id } = req.query;
  await Roles.findByIdAndUpdate(id, req.body);
  const role = await Roles.findById(id);
  return role;
};

const deleteRole = async (req) => {
  console.log(req.params);
  const { id } = req.params;
  const role = await Roles.findByIdAndDelete(id);
  return role;
};
const getById = async (req) => {
  console.log(req.params);
  const { id } = req.params;
  const role = await Roles.findById(id);

  return null;
};
module.exports = { createRole, getAll, updateRoles, deleteRole, getById };
