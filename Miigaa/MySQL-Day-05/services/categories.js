const db = require("../db");

async function getAllCategories() {
  const data = await db.query("SELECT id, name, color FROM category");
  const params = {};

  return {
    data,
    params,
  };
}

async function getCategoryById(id) {
  const data = await db.query(
    "SELECT id, name, color FROM category WHERE id = ?",
    [id]
  );
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
    "INSERT INTO category (name, color) VALUES (?, ?)",
    [name, color]
  );
  return {
    hello: "hello",
  };
}

module.exports = {
  getAllCategories,
  createCategory,
  getCategoryById,
};
