const db = require("./db");

async function getAllCategories() {
  const params = {};
  const data = await db.query(`SELECT id, name, color FROM category`);

  return {
    data,
    params,
  };
}

async function createCategory(params) {
  const data = await db.query(
    `INSERT INTO category (name, color) VALUES(?, ?)`,
    [params.name, params.color]
  );
  return {
    hello: "Hello",
  };
}

async function deleteCategory(params) {
  const data = await db.query(`DELETE FROM category WHERE id = ?`, [params.id]);
  return {
    delete: "category deleted",
  };
}

async function updateCategory(params) {
  const data = await db.query(
    `UPDATE category SET name = ?, color = ? WHERE id = ? `,
    [params.name, params.color, params.id]
  );
  return {
    update: "category updated",
  };
}

module.exports = {
  getAllCategories,
  createCategory,
  deleteCategory,
  updateCategory,
};
