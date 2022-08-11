const db = require("../db");

async function registerUser(params) {
  const { email, phone_number, address, firstname, last_name, age, register } =
    params;
  const data = await db.query(
    `INSERT INTO register(email, phone_number, address, firstname, last_name, age, register) VALUES(?,?,?,?,?,?,?)`[
      (email, phone_number, address, firstname, last_name, age, register)
    ]
  );
  const params = {};

  return {
    data,
  };
}

module.exports = { registerUser };
