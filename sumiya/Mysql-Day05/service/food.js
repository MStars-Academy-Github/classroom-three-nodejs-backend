const db = require("../db");

async function getAllFood() {
  const data =
    await db.query(`select a.id, a.namee, a.price, a.ingredients, a.category_id, a.stock, a.portion, a.image, a.tumb_img, a.discount, a.sales,  b.name, b.color, b._v from food a 
join categories b on a.category_id=b._id`);
  const params = {};
  return {
    data,
    params,
  };
}
async function createFood(params) {
  const namee = params.namee;
  const price = params.price;
  const ingredients = params.ingredients;
  const category_id = params.category_id;
  const stock = params.stock;
  const portion = params.portion;
  const image = params.image;
  const tumb_img = params.tumb_img;
  const discount = params.discount;
  const sales = params.sales;
  const data = await db.query(
    "insert into food (namee , price, ingredients,category_id,stock,portion,image,tumb_img,discount,sales ) values (?,?,?,?,?,?,?,?,?,? )",
    [
      namee,
      price,
      ingredients,
      category_id,
      stock,
      portion,
      image,
      tumb_img,
      discount,
      sales,
    ]
  );

  return {
    data,
  };
}

async function deletefood(params) {
  const id = params.id;
  console.log(id);
  const data = await db.query("delete from food where id =?", [id]);
  return {
    data,
  };
}

async function getFoodById(id) {
  const data = await db.query(
    `select a.id, a.namee, a.price, a.ingredients, a.category_id, 
    a.stock, a.portion, a.image, a.tumb_img, a.discount, a.sales, b.name, b.color, b._v from food a 
join categories b on a.category_id=b._id where a.id=?`,
    [id]
  );
  const params = {};
  return {
    data,
    params,
  };
}

async function updateFood(params) {
  console.log(params);
  const namee = params.namee;
  const price = params.price;
  const ingredients = params.ingredients;
  const category_id = params.category_id;
  const stock = params.stock;
  const portion = params.portion;
  const image = params.image;
  const tumb_img = params.tumb_img;
  const discount = params.discount;
  const sales = params.sales;
  const id = params.id;
  const data = await db.query(
    `update food set namee=? , 
    price=?, ingredients=?, category_id=?, 
    stock=?,  portion=?, image=?, tumb_img=?, 
    discount=?, sales=? where id=?`,
    [
      namee,
      price,
      ingredients,
      category_id,
      stock,
      portion,
      image,
      tumb_img,
      discount,
      sales,
      id,
    ]
  );

  return {
    data,
  };
}

module.exports = {
  getAllFood,
  createFood,
  deletefood,
  updateFood,
  getFoodById,
};
