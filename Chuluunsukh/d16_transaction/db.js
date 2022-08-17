const mysql = require("mysql2/promise");
const config = require("./config");
const pool = mysql.createPool(config.db);
const connection = mysql.createConnection(config.db);

async function query(sql, params) {
  const [rows, fields] = await pool.execute(sql, params);
  return rows;
}

async function beginTransaction() {
  pool.getConnection((err, connection) => {
    connection.beginTransaction();
  });
}

async function rollBack() {
  return await connection.rollBack();
}
async function commit() {
  return await connection.commit();
}
module.exports = { query, beginTransaction, rollBack, commit };
