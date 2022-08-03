const db = require("../db");

async function getAllCategories() {
  const data = await db.query("select * from categories");
  const params = {};
  return {
    data,
    params,
  };
}
async function createCategory(params) {
  const name = params.name;
  const color = params.color;
  const _v = params._v;
  const data = await db.query(
    "insert into categories (name, color, _v) values(?, ?, ?)",
    [name, color, _v]
  );

  return {
    data,
  };
}
async function deleteCategory(params) {
  const id = params._id;
  console.log(id);
  const data = await db.query("delete from categories where _id =?", [id]);
  return {
    data,
  };
}
async function updateCategory(params) {
  const id = params._id;
  const name = params.name;
  const color = params.color;
  const _v = params._v;
  const data = await db.query(
    "update categories set name=?, color =? , _v=? where _id=?",
    [name, color, _v, id]
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
};
