const db = require("../db");

async function getAllFood() {
  const data = await db.query("SELECT * FROM foods");
  const params = {};

  return {
    data,
    params,
  };
}

module.exports = {
  getAllFood,
};
