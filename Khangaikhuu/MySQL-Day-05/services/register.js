const db = require("../db");
const bcrypt = require("bcryptjs");

async function registerUser(params) {
  const { first_name, last_name, email, address, phone_number, user_password } =
    params;

  const hashedPassword = await bcrypt.hash(user_password, 10);
  console.log("hashed password");
  console.log(hashedPassword);

  const data = db.query(
    `INSERT INTO users (first_name, last_name, email, address, phone_number, user_password) 
    VALUES (?, ?, ?, ?, ?, ?)`,
    [first_name, last_name, email, address, phone_number, hashedPassword]
  );
  return {
    data,
  };
}
module.exports = { registerUser };
