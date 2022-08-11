const db = require("./db");
const bcrypt = require("bcryptjs");
async function getAllUser() {
  const data = await db.query(
    `SELECT u.id userId , u.first_name firstName,u.last_name lastName,u.email email,u.address address,u.phone_number phoneNumber,r.id roleId ,r.role_name roleName ,r.role_description roleDescription from users u  LEFT JOIN roles r on u.role_id = r.id `
  );
  const params = {};
  return {
    data,
    params,
  };
}
async function createUser(params) {
  const { firstName, lastName, email, address, phoneNumber, user_password } =
    params;

  const hashedPassword = await bcrypt.hash(user_password, 10);
  console.log("hashed password");
  console.log(hashedPassword);
  const data = await db.query(
    "INSERT INTO users (first_name , last_name ,email,address,phone_number,user_password ) VALUES(?,?,?,?,?,?)",
    [firstName, lastName, email, address, phoneNumber, hashedPassword]
  );
  return {
    hello: "heloo",
  };
}
async function deleteUser(params) {
  const id = params.id;
  const data = await db.query("DELETE FROM users WHERE id=?", [id]);
  return {
    hello: "amljilttai ustgagdlaa",
  };
}
async function updateUser(params) {
  const firstName = params.firstName;
  const lastName = params.lastName;
  const phone_number = params.phoneNumber;
  const address = params.address;
  const email = params.email;
  const roleId = params.roleId;
  const id = params.id;
  const data = await db.query(
    "UPDATE users SET first_name=?,last_name=?,email=?,address=?, phone_number=? ,role_id=? WHERE id=?",
    [firstName, lastName, email, address, phone_number, roleId, id]
  );
  return {
    hello: "update higdlee",
  };
}
async function getUserById(id) {
  const data = await db.query(
    "SELECT first_name, last_name,email,address,phone_number , roles.id roleId ,roles.role_name from users left join roles on users.role_id = roles.id where users.id = ?",
    [id]
  );
  const params = {};
  return {
    data,
    params,
  };
}
async function FindUser(email) {
  const data = await db.query("SELECT * FROM  users WHERE  email=?", [email]);
  const params = {};
  return {
    data,
    params,
  };
}
module.exports = {
  getAllUser,
  createUser,
  deleteUser,
  updateUser,
  getUserById,
  FindUser,
};
