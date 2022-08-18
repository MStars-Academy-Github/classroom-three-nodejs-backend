const db = require("../db");
const mysql = require("mysql2/promise");
const config = require("../config");

async function createOrder() {
  const connection = await mysql.createConnection(config.db);
  await connection.execute(`SET AUTOCOMMIT = 0`);
  console.log("setting off the autocommit");

  connection.execute(`Set SESSION TRANSACTION ISOLATION LEVEL READ COMMIT`);
  console.log("setting the transaction isolation level");

  await connection.beginTransaction();
  console.log("starting transaction");

  try {
    connection.execute(
      "INSERT INTO orders (customer_id, deliveryman_id, ordered_date, order_status, total_fee) values ( ?, ?, ?, ?, ?)",
      [1, 5, "2022-8-15 12:34:00", 1, 6000]
    );
    console.log("inserted data into orders");

    const [rows] = connection.execute("Select LAST_INSERT_ID() as order_id");
    console.log("Getting last id of the new inserted order");

    connection.execute(
      "INSERT INTO order_detail (food_id, food_price, order_id) values ( ?, ?, ?)",
      [1, 1800, rows[0].order_id]
    );
    console.log("Getting last id of the new inserted order");

    connection.commit();
    console.log("commit successfully");
  } catch (error) {
    console.error("Error occurred while creating order: " + error.message);
    connection.rollBack();
    console.error("transaction is successfully rolled back");
  }
}

(async function testCreateOrder() {
  console.log(await createOrder());
})();
