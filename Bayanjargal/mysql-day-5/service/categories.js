const db = require("./db");
async function getAllCategories() {
  const data = await db.query("SELECT id , name ,color FROM categories");
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
    "INSERT INTO categories (name,color) VALUES(?, ?)",
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
    hello: "amljilttai ustgagdlaa",
  };
}
async function updateCategory(params) {
  const id = params.id;
  const name = params.name;
  const color = params.color;
  const data = await db.query(
    "UPDATE categories SET name=?,color=? WHERE id=?",
    [name, color, id]
  );
  return {
    hello: "update higdlee",
  };
}
async function getCategoryById(id) {
  const data = await db.query(
    "SELECT id , name ,color FROM categories WHERE id = ? ",
    [id]
  );
  const params = {};
  return {
    data,
    params,
  };
}
module.exports = {
  getAllCategories,
  createCategory,
  deleteCategory,
  updateCategory,
  getCategoryById,
};
