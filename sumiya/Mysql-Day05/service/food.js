const db = require("../db");

async function getAllFood() {
  const data = await db.query("select * from food");
  const params = {};
  return {
    data,
    params,
  };
}
async function createFood(params) {
  const name = params.namee;
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
      name,
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

async function updateFood(params) {
  const name = params.namee;
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
    "update food set namee=? , price=?, ingredients=?,category_id=?,stock=?,portion=?,image=?,tumb_img=?,discount=?,sales=? where id=?",
    [
      name,
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
};
