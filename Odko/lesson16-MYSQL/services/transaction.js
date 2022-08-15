const db = require("../db");

async function createOrder() {
  db.query(`SET AUTOCOMMIT = 0`);
  console.log("autocommit");
  db.query(`SET SESSION TRANSATION ISOLATION LEVEL READ COMMITTED`);
  console.log("isolation level");
  db.beginTransation();
  console.log("start transaction");

  try {
    db.query(
      `INSERT INTO orders(customer_id,deliverman_id, ordered_date, order_status, total_fee ) 
       values(?,?,?,?,?)`,
      [1, 1, "2022-08-15", 1, 5000]
    );
    console.log("insert data into orders");

    db.query("SET @id = LAST_INSERT_ID()");
    console.log("last id");

    db.query(
      `INSERT INTO Order_Detail(food_id, food_price, order_id ) values(?,?,?)`,
      [1, 1800, "@id"]
    );
    console.log("insert data into orders_details");

    db.commit();
    console.log("commit succesfully");
  } catch (error) {
    console.error("Error creating order:" + error.message);
    db.roleBack();
    console.error("transation is successfully rolled back");
  }
}

module.exports = { createOrder };
