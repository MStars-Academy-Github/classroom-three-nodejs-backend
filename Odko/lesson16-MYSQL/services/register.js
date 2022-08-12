const db = require("../db");
const bcrypt = require("bcryptjs");

async function createRegister(params) {
  const {
    email,
    phoneNumber,
    address,
    firstname,
    lastname,
    age,
    register,
    password,
  } = params;

  const hashedPassword = await bcrypt.hash(password, 10);
  const data = await db.query(
    "INSERT INTO users ( email,phoneNumber,address,firstname,lastname,age,register,password) VALUES (?, ?, ?, ?,?,?,?,?)",
    [
      email,
      phoneNumber,
      address,
      firstname,
      lastname,
      age,
      register,
      hashedPassword,
    ]
  );
  return {
    data,
  };
}

async function findUserByEmail(email) {
  const data = await db.query("SELECT * FROM users WHERE email=?", [email]);
  return {
    data,
  };
}

module.exports = {
  createRegister,
  findUserByEmail,
};
