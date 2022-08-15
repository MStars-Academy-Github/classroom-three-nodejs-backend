const db = require("./db");

async function getAllUsersRole() {
  const data = await db.query("SELECT * FROM Roles");
  const params = {};
  return {
    data,
    params,
  };
}
async function updateRole(params) {
  const role_name = params.role_name;
  const role_description = params.role_description;
  const id = params.id;
  const data = await db.query("UPDATE Roles SET role_name=? WHERE id = ?", [
    role_name,
    role_description,
    id,
  ]);
  const param = {};
  return { data, param };
}
module.exports = {
  getAllUsersRole,
  updateRole,
};
