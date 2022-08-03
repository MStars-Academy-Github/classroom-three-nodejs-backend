const db = require("./db");

async function getAllCategories() {
  const data = await db.query("SELECT id,name,color FROM categories");
  const params = {};
  return {
    data,
    params,
  };
}
async function createCategory(params) {
  const name = params.name;
  const color = params.color;
  const data = await db.query(
    "INSERT INTO categories (name, color) values (?, ?)",
    [name, color]
  );
  return {
    hello: "hello",
  };
}
async function deleteCategory(params) {
  const id = params.id;
  const data = await db.query("DELETE FROM categories WHERE id=?", [id]);
  return {
    hello: "hello",
  };
}
async function getCategoryById(id) {
  const data = await db.query(
    "SELECT id, name, color FROM category WHERE ID = ?",
    [id]
  );
  const params = {};
  return { data, params };
}
async function updateCategory(params) {
  const name = params.name;
  const id = params.id;
  const data = await db.query("UPDATE categories SET name=? WHERE id=?", [
    name,
    id,
  ]);
}
module.exports = {
  getAllCategories,
  createCategory,
  deleteCategory,
  updateCategory,
  getCategoryById,
};
