const mysql = require("mysql2/promise");
const config = require("./config");
const pool = mysql.createPool(config.db);

async function query(sql, params) {
  const [rows, fields] = await pool.execute(sql, params);

  return rows;
}

async function beginTransaction() {
  const connection = mysql.createConnection(config.db);
  return await connection.beginTransaction();
}
async function rollback() {
  const connection = mysql.createConnection(config.db);
  return await connection.rollback();
}
async function commit() {
  const connection = mysql.createConnection(config.db);
  return await connection.commit();
}

// async function addQuery(sql, params) {
//   const [rows, fields] = await pool.execute(sql, params);

//   return rows;
// }

module.exports = {
  query,
  beginTransaction,
  rollback,
  commit,
};
