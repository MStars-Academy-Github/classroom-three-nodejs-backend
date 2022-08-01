const db = require("./db");

async function getAllCategories() {
  const data = await db.query("select _id, name, color from category");
  const params = {};

  return {
    data,
    params,
  };
}

module.exports = { getAllCategories };
