const db = require("./db");

async function getAllFoods() {
  const data = await db.query("SELECT * FROM food");
  const params = {};
  return {
    data,
    params,
  };
}
async function createFood(params) {
  const name = params.name;
  const price = params.price;
  const ingredient = params.ingredient;
  const stock = params.stock;
  const category_id = params.category_id;
  const discount = params.discount;
  const image = params.image;
  const portion = params.portion;
  const tumb_img = params.tumb_img;
  const sales = params.sales;
  const category = params.category;
  const data = await db.query(
    "INSERT INTO food ( name, price, ingredient, stock, category_id, discount, image, portion, tumb_img, sales, category) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )",
    [
      name,
      price,
      ingredient,
      stock,
      category_id,
      discount,
      image,
      portion,
      tumb_img,
      sales,
      category,
    ]
  );
  return {
    hello: "hello",
  };
}
async function deleteFood(params) {
  const id = params.id;
  const data = await db.query("DELETE FROM food WHERE id=?", [id]);
  return {
    hello: "hello",
  };
}
module.exports = {
  getAllFoods,
  createFood,
  deleteFood,
};
