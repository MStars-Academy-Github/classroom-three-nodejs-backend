const db = require("../db");

async function findUserByEmail(email) {
  const data = await db.query(`SELECT * FROM users WHERE email = ?)`[email]);
  const params = {};

  return {
    data,
  };
}

module.exports = { findUserByEmail };
