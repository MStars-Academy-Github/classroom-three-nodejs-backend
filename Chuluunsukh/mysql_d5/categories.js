const db = require("./db");

async function getAllCategories() {
  const data = await db.query("SELECT id, name, color, FROM category");
  const params = {};

  return {
    data,
    params,
  };
}

module.exports = {
  getAllCategories,
};
