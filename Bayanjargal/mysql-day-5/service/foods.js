const db = require("./db");
async function getAllfoods() {
  const data = await db.query(
    `SELECT f.id FoodId ,f.name FoodName,f.price foodPrice,f.ingredients 
    foodIngredients,f.stock foodStock,f.discount foodDiscount,f.image foodImage,f.portion foodPortion,f.thumb_image
    foodThumbImage,c.id categoryId,c.name categoryName,c.color categoryColor 
    FROM food f LEFT JOIN categories c on f.categoryID=c.id`
  );
  const params = {};
  return {
    data,
    params,
  };
}
async function createFoods(params) {
  const name = params.name;
  const price = params.price;
  const ing = params.ingredients;
  const stock = params.stock;
  const catId = params.categoryID;
  const discount = params.discount;
  const image = params.image;
  const portion = params.portion;
  const thumbImage = params.thumb_image;
  const data = await db.query(
    "INSERT INTO food (name,price,ingredients,stock,categoryID,discount,image,portion,thumb_image) VALUES(?,?,?,?,?,?,?,?,?)",
    [name, price, ing, stock, catId, discount, image, portion, thumbImage]
  );
  return {
    hello: "hello",
  };
}
async function deleteFoods(params) {
  const id = params.id;
  const data = await db.query("DELETE FROM food WHERE id=?", [id]);
  return {
    hello: "amljilttai ustgagdlaa",
  };
}
async function updateFoods(params) {
  const name = params.name;
  const price = params.price;
  const ing = params.ingredients;
  const stock = params.stock;
  const catId = params.categoryID;
  const discount = params.discount;
  const image = params.image;
  const portion = params.portion;
  const thumbImage = params.thumb_image;
  const id = params.id;
  const data = await db.query(
    "UPDATE food SET name=?,price=?,discount=?,portion=?,categoryID=? ,ingredients=?,stock=?,image=? ,thumb_image=? WHERE id=?",
    [name, price, discount, portion, catId, ing, stock, image, thumbImage, id]
  );
  return {
    hello: "update higdlee",
  };
}
async function getFoodById(id) {
  const data = await db.query(
    "SELECT id,name,price,ingredients,stock,categoryID,discount,image,portion,thumb_image FROM food WHERE id = ? ",
    [id]
  );
  const params = {};
  return {
    data,
    params,
  };
}
module.exports = {
  getAllfoods,
  createFoods,
  deleteFoods,
  updateFoods,
  getFoodById,
};
