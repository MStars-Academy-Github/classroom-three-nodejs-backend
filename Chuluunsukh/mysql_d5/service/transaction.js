const db = require("../db");

async function createOrder() {
  db.query(`SET AUTOCOMMIT = 0`);
  db.query(`SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ`);
  db.query(`START TRANSACTION`);
}
module.exports = { createOrder };
