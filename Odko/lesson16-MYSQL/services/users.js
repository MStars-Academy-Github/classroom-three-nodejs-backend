const db = require("../db");

async function getAllUsers() {
  const data = await db.query("SELECT * FROM users");
  const params = {};

  return {
    data,
    params,
  };
}

module.exports = {
  getAllUsers,
};
