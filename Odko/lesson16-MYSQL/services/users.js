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
  const phoneNumber = params.phone;
  const email = params.email;
  const age = params.age;
  const register = params.register;
  const role_id = params.role_id;
  const data = await db.query(
    "INSERT INTO users ( lastname, firstname,address,phoneNumber,role_id,email,age,register) VALUES (?, ?, ?, ?, ?,?,?,?)",
    [lastname, firstname, address, phoneNumber, role_id, email, age, register]
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
async function getUserJoinRoles() {
  const data = await db.query(
    // ` SELECT * FROM users u LEFT JOIN roles r ON u.id = r.id WHERE u.id=1 `
    `SELECT u.id userID, u.lastname userLastname, u.firstname userFirstname,
    u.address userAddress, u.phoneNumber userPhoneNumber, u.email userEmail,   u.register userRegister, 
    r.id roleID, r.role_name rolesRole_name, r.role_desc rolesRole_desc
    FROM users u LEFT JOIN roles r ON u.role_id = r.id`
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
  const phoneNumber = params.phoneNumber;
  const email = params.email;
  const age = params.age;
  const register = params.register;
  const role_id = params.role_id;

  const data = await db.query(
    "UPDATE users SET lastname =?, firstname=?, address=?, phoneNumber=?, role_id=? ,email=?,age=?,register=? WHERE id=? ",
    [
      lastname,
      firstname,
      address,
      phoneNumber,
      role_id,
      email,
      age,
      register,
      id,
    ]
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
