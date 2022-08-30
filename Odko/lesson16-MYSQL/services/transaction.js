const db = require("../db");
const mysql = require("mysql2/promise");
const config = require("../config");

async function createOrder() {
  const connection = await mysql.createConnection(config.db);

  await connection.execute(`SET AUTOCOMMIT = 0`);
  console.log("autocommit");

  connection.execute(`SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED`);
  console.log("isolation level");

  await connection.beginTransaction();
  console.log("start transaction");

  try {
    connection.execute(
      `INSERT INTO orders( customer_id,deliverman_id, ordered_date, order_status, total_fee ) 
       values(?,?,?,?,?)`,
      [1, 1, "2022-08-15", 1, 5000]
    );
    console.log("insert data into orders");

    const [rows] = await connection.execute(
      "SELECT LAST_INSERT_ID() as order_id;"
    );
    console.log(rows);
    console.log("last id");

    connection.execute(
      `INSERT INTO Order_Detail(food_id, food_price, order_id ) values(?,?,?)`,
      [1, 1800, rows[0].order_id]
    );
    console.log("insert data into orders_details");

    connection.commit();
    console.log("commit succesfully");
  } catch (error) {
    console.error("Error creating order:" + error.message);
    connection.roleBack();
    console.error("transation is successfully rolled back");
  }
}

module.exports = { createOrder };
