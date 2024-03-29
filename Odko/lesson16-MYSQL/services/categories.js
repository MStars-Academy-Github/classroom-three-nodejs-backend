const db = require("../db");

async function getAllCategories() {
  const data = await db.query("SELECT id, name, color FROM category");
  const params = {};

  return {
    data,
    params,
  };
}

async function createCategory(params) {
  const id = params.id;
  const name = params.name;
  const color = params.color;
  const data = await db.query(
    "INSERT INTO category (id, name, color) VALUES (?, ?, ?, ?)",
    [id, name, color, v]
  );
  return {
    data,
  };
}

async function deleteCategory(params) {
  const id = params.id;
  const data = await db.query("DELETE FROM category where id = ?", [id]);
  return {
    data,
  };
}

async function getCategoryById(id) {
  const data = await db.query(
    "SELECT id, name, color FROM category WHERE id=?",
    [id]
  );
  const params = {};
  return {
    data,
    params,
  };
}
async function updateCategory(params) {
  const id = params.id;
  const name = params.name;
  const color = params.color;
  const data = await db.query(
    "UPDATE category SET name=?, color=? where id=?  ",
    [name, color, v, id]
  );
  return {
    data,
  };
}

module.exports = {
  getAllCategories,
  createCategory,
  deleteCategory,
  updateCategory,
  getCategoryById,
};
