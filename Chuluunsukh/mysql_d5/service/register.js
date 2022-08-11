const db = require("../db");
const bcrypt = require("bcryptjs");

async function registerUser(params) {
  const {
    email,
    phoneNumber,
    address,
    firstName,
    lastName,
    age,
    register,
    password,
  } = params;

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("hashed password");
  console.log(hashedPassword);

  const data = await db.query(
    `INSERT INTO users(email, phoneNumber, 
      address, firstName, lastName, age, register, password) VALUES(?,?,?,?,?,?,?,?)`,
    [
      email,
      phoneNumber,
      address,
      firstName,
      lastName,
      age,
      register,
      hashedPassword,
    ]
  );

  return {
    data,
  };
}

module.exports = { registerUser };
