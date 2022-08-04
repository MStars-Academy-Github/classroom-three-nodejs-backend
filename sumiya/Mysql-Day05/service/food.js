const db = require("../db");

async function getAllFood() {
  const data = await db.query("select * from food");
  const params = {};
  return {
    data,
    params,
  };
}

module.exports = {
  getAllFood,
};
