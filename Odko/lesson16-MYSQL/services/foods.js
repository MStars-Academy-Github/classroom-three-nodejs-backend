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
  const name = params.name;
  const price = params.price;
  const portion = params.portion;
  const stock = params.stock;
  const image = params.image;
  const tumb_img = params.tumb_img;
  const ingredients = params.ingredients;
  const data = await db.query(
    "INSERT INTO foods ( discount, sales, category_id, name,price,portion,stock,image,tumb_img,ingredients) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      discount,
      sales,
      category_id,
      name,
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
  const id = params;
  const data = await db.query("DELETE FROM foods where _id = ?", [id]);
  return {
    data,
  };
}
module.exports = {
  getAllFood,
  deleteFood,
};
