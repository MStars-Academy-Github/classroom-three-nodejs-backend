const db = require("../db");

async function createOrder() {
  db.query(`SET AUTOCOMMIT = 0`);
  console.log("setting off the autocommit");

  db.query(`SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ`);
  console.log("setting the transaction isolation level");
  db.beginTransaction();
  console.log("starting transaction");

  try {
    db.query(
      `INSERT INTO orders(customer_id, deliveryman_id, ordered_date, order_status, total_fee) values (?, ?, ?, ?, ?)`,
      "2022-08-15 12:33",
      1,
      6000
    );

    db.query(`SET @id = LAST_INSERT_ID()`);
    console.log("Getting last id of the new inserted order");
    db.query(
      `INSERT INTO order_detail (food_id, food_price, order_id) values (?, ?, ?), [1,1800, "@id"]`
    );
    db.commit();
    console.log("commited successfully");
  } catch (error) {
    consoler.error("Error occured while creating order:" + error.message);
    db.rollBack();
    console.error("transaction successfully rolled back");
  }
}
module.exports = { createOrder };
