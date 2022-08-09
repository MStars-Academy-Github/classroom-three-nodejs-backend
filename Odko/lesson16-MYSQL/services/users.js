const db = require("../db");

async function getAllUsers() {
  const data = await db.query("SELECT * FROM users");
  const params = {};

  return {
    data,
    params,
  };
}

async function createUsers(params) {
  const lastname = params.lastname;
  const firstname = params.firstname;
  const address = params.address;
  const phone = params.phone;
  const role_id = params.role_id;
  const data = await db.query(
    "INSERT INTO users ( lastname, firstname,address,phone,role_id) VALUES (?, ?, ?, ?, ?)",
    [lastname, firstname, address, phone, role_id]
  );
  return {
    data,
  };
}
async function deleteUsers(params) {
  const id = params.id;
  const data = await db.query("DELETE FROM users where id = ?", [id]);
  return {
    data,
  };
}

async function getUsersById(id) {
  console.log(id);
  const data = await db.query("SELECT * FROM users WHERE id=?", [id]);
  const params = {};
  return {
    data,
    params,
  };
}
async function getUserJoinRoles(id) {
  const data = await db.query(
    // `SELECT * FROM users f LEFT JOIN roles c ON f.id = c.id `
    `SELECT u.id userID, u.lastname userLastnmae, u.firstname userFirstname,  
    u.address userAddress, u.phone userPhone, u.role_id userRoleID,
    r.id roleID, r.role_name rolesRole_name, r.role_desc rolesRole_desc
    FROM users u LEFT JOIN roles r ON u.role_id = r.id `
  );
  const params = {};
  return {
    data,
    params,
  };
}

async function updateUsers(params) {
  const id = params.id;
  const lastname = params.lastname;
  const firstname = params.firstname;
  const address = params.address;
  const phone = params.phone;
  const role_id = params.role_id;

  const data = await db.query(
    "UPDATE users SET lastname =?, firstname=?, address=?, phone=?, role_id=? WHERE id=? ",
    [id, lastname, firstname, address, phone, role_id]
  );
  return {
    data,
  };
}

module.exports = {
  getUserJoinRoles,
  getAllUsers,
  updateUsers,
  getUsersById,
  createUsers,
  deleteUsers,
};
