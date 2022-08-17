const db = require("../db");

async function getAllFoodsWithCategory() {
  const data = await db.query(
    `SELECT f.id foodId, f.name foodName, f.price foodPrice, 
     f.ingredient foodIngredient, f.stock foodStock,
     f.discount foodDiscount, f.image foodImage, f.thumb_img foodThumbImage,
     f.sales foodSales, c.id categoryId, c.name categoryName, c.color categoryColor
     FROM foods f LEFT JOIN category c ON f.category_id = c.id`
  );
  const params = {};

  return {
    data,
    params,
  };
}
async function getAllFoods() {
  const data = await db.query(
    `SELECT f.id foodId, f.name foodName, f.price foodPrice, 
     f.ingredient foodIngredient, f.stock foodStock,
     f.discount foodDiscount, f.image foodImage, f.thumb_img foodThumbImage,
     f.sales foodSales, c.id categoryId, c.name categoryName, c.color categoryColor
     FROM foods f LEFT JOIN category c ON f.category_id = c.id`
  );
  const params = {};

  return {
    data,
    params,
  };
}

module.exports = {
  getAllFoodsWithCategory,
  getAllFoods,
};
