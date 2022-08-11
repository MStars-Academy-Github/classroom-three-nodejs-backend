const db = require("../db");

async function getAllRoles() {
  const data = await db.query("SELECT * FROM roles");
  const params = {};

  return {
    data,
    params,
  };
}

async function createRoles(params) {
  console.log(params);
  const role_name = params.role_name;
  const role_desc = params.role_desc;
  const data = await db.query(
    "INSERT INTO roles ( role_name, role_desc) VALUES (?, ?)",
    [role_name, role_desc]
  );
  return {
    data,
  };
}
async function deleteRoles(params) {
  const id = params.id;
  const data = await db.query("DELETE FROM roles where id = ?", [id]);
  return {
    data,
  };
}

async function getRolesById(id) {
  const data = await db.query("SELECT * FROM roles WHERE id=?", [id]);
  const params = {};
  return {
    data,
    params,
  };
}
async function getRoleJoin(id) {
  const data = await db.query(
    `SELECT *  FROM roles f LEFT JOIN category c ON f.category_id = c.id `
    // `SELECT f.discount foodDiscount, f.sales foodSales,
    // f.category_id foodCategory_id, f.name foodName,
    // f.price foodPrice, f.portion foodPortion, f.stock foodStock,
    // f.image foodImage, f.tumb_img foodTumb_img, f.ingredients foodIngredients,
    // c.id categoryID, c.name categoryName, c.color categoryColor, c.v categoryV
    // FROM foods f LEFT JOIN category c ON f.category_id = c.id `
  );
  const params = {};
  return {
    data,
    params,
  };
}

async function updateRoles(params) {
  console.log(params);
  const id = params.id;
  const role_name = params.role_name;
  const role_desc = params.role_desc;

  const data = await db.query(
    "UPDATE roles SET role_name=?, role_desc=? WHERE id=? ",
    [role_name, role_desc, id]
  );
  return {
    data,
  };
}
module.exports = {
  getAllRoles,
  createRoles,
  getRolesById,
  deleteRoles,
  getRoleJoin,
  updateRoles,
};
