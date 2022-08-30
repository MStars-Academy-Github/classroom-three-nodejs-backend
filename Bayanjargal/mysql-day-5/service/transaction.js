const db = require("./db");
const mysql = require("mysql2/promise");
const config = require("../config");
async function createOrder() {
  const connection = await mysql.createConnection(config.db);
  await connection.execute(`SET AUTOCOMMIT=0`);
  console.log("settiong off the autocommit");
  connection.execute(`SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED`);
  console.log("setting of isolation level");
  await connection.beginTransaction();
  console.log("starting transaction");

  try {
    connection.execute(
      `INSERT INTO orders(customer_id,deliveryman_id,ordered_date,order_status,total_fee) values (?,?,?,?,?)`,
      [14, 10, "2022-08-15 10:56:15", "1", 5000]
    );

    const [rows] = await connection.execute(
      "SELECT LAST_INSERT_ID() as order_id"
    );
    console.log(rows);
    console.log("getting last id from order_id");

    connection.execute(
      `INSERT INTO order_detail(food_id,food_price,order_id) values (?,?,?)`,
      [20, 1800, rows[0].order_id]
    );
    console.log("insert data into order_detail");

    connection.commit();
    console.log("commit successfully");
  } catch (err) {
    console.error("Error occured while creating order:" + err.message);
    connection.rollback();
    console.log("transaction is successfully rolled back");
  }
}

module.exports = { createOrder };
