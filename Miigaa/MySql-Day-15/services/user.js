const db = require("./db");

async function getAllUser() {
  const data = await db.query("SELECT * FROM User");
  const params = {};
  return {
    data,
    params,
  };
}
async function createUser(params) {
  const id = params.id;
  const first_name = params.first_name;
  const last_name = params.last_name;
  const email = params.email;
  const address = params.address;
  const phone_number = params.phone_number;
  const role_id = params.role_id;
  const data = await db.query(
    "INSERT INTO User (id ,first_name, last_name, email, address, phone_number, role_id) values (?, ?, ?, ?, ?, ?, ?)",
    [id, first_name, last_name, email, address, phone_number, role_id]
  );
  return {
    hello: "hello",
  };
}
async function getUserById(id) {
  const data = await db.query("SELECT * FROM User WHERE id= ?", [id]);
  const params = {};
  return { data, params };
}
async function deleteUser(params) {
  const id = params.id;
  const data = await db.query("DELETE FROM User WHERE id=?", [id]);
  return {
    hello: "hello",
  };
}
async function updateUser(params) {
  const first_name = params.first_name;
  const last_name = params.last_name;
  const email = params.email;
  const address = params.address;
  const phone_number = params.phone_number;
  const UserId = params.id;

  const data = await db.query(
    "UPDATE User SET first_name=? , last_name=?, email=?, address=?, phone_number=? WHERE id =?",
    [first_name, last_name, email, address, phone_number, UserId]
  );
  const param = {};
  return { data, param };
}
module.exports = {
  getAllUser,
  createUser,
  deleteUser,
  updateUser,
  getUserById,
};
