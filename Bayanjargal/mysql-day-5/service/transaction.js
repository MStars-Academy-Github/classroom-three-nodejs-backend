const db = require("./db");
const bcrypt = require("bcryptjs");

async function createOrder() {
  db.query(`SET AUTOCOMMIT=0`);
  console.log("settiong off the autocommit");
  db.query(`SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED`);
  console.log("setting of isolation level");
  db.beginTransaction();
  console.log("starting transaction");
  try {
    db.query(
      `INSERT INTO orders(customer_id,deliveryman_id,ordered_date,order_status,total_fee) values (?,?,?,?,?)`,
      [14, 10, "2022-08-15 10:56:15", "1", 5000]
    );
    db.query("set @id=LAST_INSERT_ID()");
    console.log("getting last id from order_id");
    db.query(`order_detail(food_id,food_price,order_id) values (?,?,?)`, [
      20,
      1800,
      "@id",
    ]);
    console.log("insert data into order_detail");
    db.commit();
    console.log("commit successfully");
  } catch (err) {
    console.error("Error occured while creating order:" + err.message);
    db.rollBack();
    console.log("transaction is successfully rolled back");
  }
}

module.exports = { createOrder };
