const db = require("./db");

async function getAllCategories() {
  const data = await db.query("SELECT _id, name, color FROM category");
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
    " INSERT INTO category (name, color) VALUES (?, ?)",
    [name, color]
  );
  return {
    data: data,
  };
}

async function deleteCategory(params) {
  const id = params._id;
  const data = await db.query("DELETE FROM category where _id=?", [id]);
  return {
    data: data,
  };
}

async function updateCategory(params) {
  const id = params._id;
  const name = params.name;
  const color = params.color;
  const data = await db.query(
    "update category set name=?, color=? where _id=?  ",
    [name, color, id]
  );
  return {
    data: data,
  };
}

module.exports = {
  getAllCategories,
  createCategory,
  deleteCategory,
  updateCategory,
};
