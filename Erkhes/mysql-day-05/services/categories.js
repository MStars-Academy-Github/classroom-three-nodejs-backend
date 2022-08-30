const db = require("../db");
async function getAllCategories() {
  const data = await db.query("SELECT id , name ,color FROM category");
  const params = {};

  return {
    data,
    params,
  };
}
async function deleteCategory(params) {
  const id = params.id;

  const data = await db.query("DELETE FROM category where id = ?", [id]);
  return {
    data,
  };
}
async function createCategory(params) {
  const id = params.id;
  const name = params.name;
  const color = params.color;
  const data = await db.query(`INSERT INTO category values(? , ? , ?) `, [
    id,
    name,
    color,
  ]);
  return {
    hello: "HALO",
  };
}
async function updateCategory(params) {
  const id = params.id;
  const name = params.name;
  const data = await db.query("UPDATE category SET  name =?  where id =?", [
    name,
    id,
  ]);
  return {
    work: "this is working",
  };
}
async function getCategoryById(id) {
  const data = await db.query("SELECT * from category where id = ?", [id]);
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
