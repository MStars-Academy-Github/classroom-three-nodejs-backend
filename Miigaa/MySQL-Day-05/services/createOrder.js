const db = require("../db");

async function createOrder() {
  db.query(`SET AUTOCOMMIT = 0`);
  console.log("setting off the autocommit");
  db.query(`Set SESSION TRANSACTION ISOLATION LEVEL READ COMMIT`);
  console.log("setting the transaction isolation level");
  db.beginTransaction;
  console.log("starting transaction");

  try {
    db.query(
      "INSERT INTO orders (customer_id, deliveryman_id, ordered_date, order_status, total_fee) values (?,?,?,?,?)",
      [1, 5, "2022-8-15 12:34:00", 1, 6000]
    );
    db.query("Set @id = LAST_INSERT_ID()");
    db.query(
      "INSERT INTO order_detail (food_id, food_price, order_id) values (?,?,?)",
      [1, 1800, "@id"]
    );
    console.log("Getting last id of the new inserted order");
    db.commit();
    console.log("commit successfully");
  } catch (error) {
    console.error("Error occurred while creating order: " + error.message);
    db.rollBack();
    console.error("transaction is successfully rolled back");
  }
}

module.exports = { createOrder };
