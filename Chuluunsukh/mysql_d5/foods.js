const db = require("./db");

async function getAllFoods() {
  const data = await db.query(
    "SELECT id, name, category_id, price, portion, stock, image, tumb_img, ingredients FROM foods"
  );
  const params = {};

  return {
    data,
    params,
  };
}
async function createFood(params) {
  const name = params.name;
  const category_id = params.category_id;
  const price = params.price;
  const portion = params.portion;
  const stock = params.stock;
  const image = params.image;
  const tumb_img = params.tumb_img;
  const ingredients = params.ingredients;
  const data = await db.query(
    "INSERT INTO foods (name, category_id, price, portion ,stock ,image ,tumb_img ,ingredients) values (?, ?, ?, ?, ? ,? ,? ,?)",
    [name, category_id, price, portion, stock, image, tumb_img, ingredients]
  );
  return {
    hello: "hello",
  };
}
module.exports = { getAllFoods, createFood };
