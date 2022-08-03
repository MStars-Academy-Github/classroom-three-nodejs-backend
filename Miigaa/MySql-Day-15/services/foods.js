const db = require("./db");

async function getAllFoods() {
  const data = await db.query("SELECT * FROM food");
  const params = {};
  return {
    data,
    params,
  };
}
async function createFood({ params }) {
  console.log(params);

  const name = params.name;
  const price = params.price;
  const ingredient = params.ingredient;
  const stock = params.stock;
  const category_id = params.category_id;
  const discount = params.discount;
  const image = params.image;
  const portion = params.portion;
  const thumb_img = params.thumb_img;
  const sales = params.sales;
  const category = params.category;
  const data = await db.query(
    "INSERT INTO food ( name, price, ingredient, stock, category_id, discount, image, portion, thumb_img, sales, category) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )",
    [
      name,
      price,
      ingredient,
      stock,
      category_id,
      discount,
      image,
      portion,
      thumb_img,
      sales,
      category,
    ]
  );
  return {
    hello: "hello",
  };
}
module.exports = {
  getAllFoods,
  createFood,
};
