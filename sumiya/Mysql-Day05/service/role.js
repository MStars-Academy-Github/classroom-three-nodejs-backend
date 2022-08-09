const db = require("../db");

async function getAllRole() {
  const data = await db.query("select * from Role");
  const params = {};
  return {
    data,
    params,
  };
}

async function insertRole(params) {
  const role_name = params.role_name;
  const role_description = params.role_description;
  const data = await db.query(
    `insert into Role (role_name, role_description) 
values (? , ? )`,
    [role_name, role_description]
  );

  return {
    data,
    params,
  };
}
async function UpdateRole(params) {
  console.log(params);
  const role_name = params.role_name;
  const role_description = params.role_description;
  const id = params.id;
  const data = await db.query(
    `update Role set role_name=?, role_description=? where id =?`,
    [role_name, role_description, id]
  );
  return {
    data,
  };
}
async function getRoleById(id) {
  const data = await db.query("select * from User where id=?", [id]);
  const params = {};
  return {
    data,
    params,
  };
}

module.exports = {
  getAllRole,
  insertRole,
  UpdateRole,
  getRoleById,
};
