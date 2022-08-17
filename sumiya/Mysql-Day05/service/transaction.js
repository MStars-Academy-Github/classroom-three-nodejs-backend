const db = require("../db");

async function createOrder() {
  db.query(`SET AUTOCOMMIT =0`);
  console.log("setting of the autocoomit");
  db.query(`SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITED`);
  console.log("setting the transaction isolation level");
  db.beginTransaction();
  console.log("start transaction");

  try {
    db.query(
      `insert into orders (customer_id,deliverman_id,order_status,total_fee,ordered_date) values (?,?,?,?,?)`,
      [2, 3, 1, 5000, "2022-08-15 12:33:37"]
    );
    console.log("insert data into orders");

    db.query("set @id = last_insert_id()");
    console.log("Getting last id of the new inserted order");

    db.query(
      "insert into order_detail (food_id , food_price , order_id) values (? ,? , ?)",
      [17, 9800, "@id"]
    );
    console.log("insert data into order_detail");

    db.commit();
    console.log("commit successfully");
  } catch (error) {
    console.error("Error occured while creating order :" + error.message);
    db.rollback();
    console.error("transaction is succesfully rolled back ");
  }
}
module.exports = { createOrder };
