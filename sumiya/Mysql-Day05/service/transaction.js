const mysql = require("mysql2/promise");
const config = require("../config");

async function createOrder() {
  const connection = await mysql.createConnection(config.db);
  await connection.execute(`SET AUTOCOMMIT =0`);
  //   db.query(`SET AUTOCOMMIT =0`);
  console.log("setting of the autocommit");
  connection.execute(`SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITED`);
  console.log("setting the transaction isolation level");

  await connection.beginTransaction();
  console.log("start transaction");

  try {
    connection.execute(
      `insert into orders (customer_id,deliverman_id,order_status,total_fee,ordered_date) values (?,?,?,?,?)`,
      [2, 3, 1, 5000, "2022-08-15 12:33:37"]
    );
    console.log("insert data into orders");

    const [rows] = await connection.execute(
      "select last_insert_id() as order_id"
    );
    console.log("Getting last id of the new inserted order");

    connection.execute(
      "insert into order_detail (food_id , food_price , order_id) values (? ,? , ?)",
      [17, 9800, rows[0].order_id]
    );
    console.log("insert data into order_detail");

    connection.commit();
    console.log("commit successfully");
  } catch (error) {
    console.error("Error occured while creating order :" + error.message);
    connection.rollback();
    console.error("transaction is succesfully rolled back ");
  }
}
(async function testOrder() {
  console.log(await createOrder());
})();

// module.exports = { createOrder };
