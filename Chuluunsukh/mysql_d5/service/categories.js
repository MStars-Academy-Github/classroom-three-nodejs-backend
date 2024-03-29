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
  const name = params.name;
  const color = params.color;
  const v = params.v;
  const data = await db.query(
    "INSERT INTO category (name, color, v) values (?, ?, ?)",
    [name, color, v]
  );
  return {
    hello: "hello",
  };
}

async function deleteCategory(params) {
  const id = params.id;
  const data = await db.query("DELETE FROM category where id = ?", [id]);
  return {
    data,
  };
}
async function updateCategory(params) {
  const id = params.id;
  const name = params.name;
  const color = params.color;
  const v = params.v;
  const data = await db.query(
    "UPDATE category SET name=?, color=?, v=? where id=?  ",
    [name, color, v, id]
  );
  return {
    data,
  };
}

module.exports = {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
