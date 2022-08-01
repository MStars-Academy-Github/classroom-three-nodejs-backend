const db = require("./db");

async function getAllCategories() {
  const params = {
    limit: "LIMIT 2",
  };
  const data = await db.query(
    `SELECT id, name, color FROM category ${params.limit}`
  );

  return {
    data,
    params,
  };
}

module.exports = {
  getAllCategories,
};
