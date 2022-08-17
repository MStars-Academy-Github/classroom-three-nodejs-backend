const db = require("../db");

async function createOrder() {
  const connection = await mysql.createConnection(config.db);
  await connection.execute(`SET AUTOCOMMIT = 0`);

  connection.execute(`SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITED`);
  console.log("setting transaction isolation level");

  await connection.beginTransaction();
  console.log("starting connection");
  try {
    connection.execute(
      `INSERT INTO orders(customer_id, deliveryman_id, ordered_date, order_status, total_fee) values (?, ?, ?, ?, ?)`,
      [1, 5, "2022-08-15 12:33", 1, 6000]
    );

    console.log("inserted data into orders");

    const [rows] = await connection.execute(
      "SELECT LAST_INSERT_ID() as order_id"
    );
    console.log(rows);
    console.log("Getting last id of the new inserted order");

    connection.execute(
      `INSERT INTO order_detail (food_id, food_price, order_id) values (?, ?, ?)`,
      [1, 1800, rows[0].order_id]
    );
    console.log("insert data into order detail");

    connection.commit();
    console.log("commit successfully");
  } catch (error) {
    consoler.error("Error occured while creating order:" + error.message);
    db.rollBack();
    console.error("transaction successfully rolled back");
  }
}
module.exports = { createOrder };
