const db = require("../db");

async function registerUser(params) {
  const { first_name, last_name, email, address, phone_number, user_password } =
    params;

  const data = await db.query(
    `INSERT INTO users (first_name, last_name, email, address, phone_number, user_password) 
    VALUES (?, ?, ?, ?, ?, ?)`,
    [first_name, last_name, email, address, phone_number, user_password]
  );
  return {
    data,
  };
}
module.exports = { registerUser };
