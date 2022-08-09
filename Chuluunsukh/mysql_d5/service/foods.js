const db = require("../db");
const categories = require("./categories");
const router = require("../routes/categories");

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

async function getAllFoodsWithCategory() {
  const data = await db.query(
    `SELECT f.id foodId, f.name foodName, f.price foodPrice, f.ingredient foodIngredient, f.stock foodStock, f.discount foodDiscount, f.image foodImage, f.tumb_img foodTumbimg, f.sales foodSales, c.id categoryId, c.name categoryName, c.color categoryColor, FROM foods f LEFT JOIN f.category c ON f.category_id = c.id`
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
  g;
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
module.exports = { getAllFoods, createFood, getAllFoodsWithCategory };
