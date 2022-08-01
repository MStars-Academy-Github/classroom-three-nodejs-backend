const db = require("../db");

async function getAllCategories() {
  const data = await db.query("SELECT id, name, color, v FROM category");
  const params = {};

  return {
    data,
    params,
  };
}

async function createCategory(params) {
  const name = params.name;
  const color = params.color;
  const v = params.v;
  const data = await db.query(
    "INSERT INTO category ( name, color, v) VALUES (?, ?, ?)",
    [name, color, v]
  );
  return {
    data,
  };
}

async function deleteCategory(params) {
  const name = params.id;
  console.log(name);
  const data = await db.query(
    "INSERT INTO category ( name, color, v) VALUES (?, ?, ?)",
    [name, color, v]
  );
  return {
    data,
  };
}

module.exports = {
  getAllCategories,
  createCategory,
  deleteCategory,
};
