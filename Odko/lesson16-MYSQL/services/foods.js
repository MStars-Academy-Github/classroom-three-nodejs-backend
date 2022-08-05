const db = require("../db");

async function getAllFood() {
  const data = await db.query("SELECT * FROM foods");
  const params = {};

  return {
    data,
    params,
  };
}

async function createFood(params) {
  const discount = params.discount;
  const sales = params.sales;
  const category_id = params.category_id;
  const foodName = params.foodName;
  const price = params.price;
  const portion = params.portion;
  const stock = params.stock;
  const image = params.image;
  const tumb_img = params.tumb_img;
  const ingredients = params.ingredients;
  const data = await db.query(
    "INSERT INTO foods ( discount, sales, category_id, foodName,price,portion,stock,image,tumb_img,ingredients) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      discount,
      sales,
      category_id,
      foodName,
      price,
      portion,
      stock,
      image,
      tumb_img,
      ingredients,
    ]
  );
  return {
    data,
  };
}
async function deleteFood(params) {
  const id = params._id;
  const data = await db.query("DELETE FROM foods where _id = ?", [id]);
  return {
    data,
  };
}

async function getFoodById(id) {
  const data = await db.query("SELECT * FROM foods WHERE _id=?", [id]);
  const params = {};
  return {
    data,
    params,
  };
}
async function getFoodJoinFood(id) {
  const data = await db.query(
    `SELECT *  FROM foods f LEFT JOIN category c ON f.category_id = c.id `
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

async function updateFood(params) {
  const _id = params._id;
  const discount = params.discount;
  const sales = params.sales;
  const category_id = params.category_id;
  const foodName = params.foodName;
  const price = params.price;
  const portion = params.portion;
  const stock = params.stock;
  const image = params.image;
  const tumb_img = params.tumb_img;
  const ingredients = params.ingredients;

  const data = await db.query(
    "UPDATE foods SET discount =?, sales=?, category_id=?, foodName=?, price=?, portion=?, stock=?, image=?, tumb_img=?, ingredients=? WHERE _id=? ",
    [
      discount,
      sales,
      category_id,
      foodName,
      price,
      portion,
      stock,
      image,
      tumb_img,
      ingredients,
      _id,
    ]
  );
  return {
    data,
  };
}
module.exports = {
  getAllFood,
  deleteFood,
  createFood,
  getFoodById,
  getFoodJoinFood,
  updateFood,
};
