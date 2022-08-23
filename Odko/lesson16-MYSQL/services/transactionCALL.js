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
    connection.execute(" CALL food_delivery_orders2(?,?,?,?,?)", [
      1,
      1,
      "3333-08-15",
      1,
      5000,
    ]);
    console.log("insert data into orders");

    connection.commit();
    console.log("commit succesfully");
  } catch (error) {
    console.error("Error creating order:" + error.message);
    connection.roleBack();
    console.error("transation is successfully rolled back");
  }
}

module.exports = { createOrder };
