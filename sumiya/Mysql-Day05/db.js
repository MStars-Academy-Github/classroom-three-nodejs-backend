const mysql = require("mysql2/promise");
const config = require("./config");
const pool = mysql.createPool(config.db);

async function query(sql, params) {
  const [rows, fields] = await pool.execute(sql, params);

  return rows;
}

async function beginTransaction() {
  return await pool.beginTransaction();
}
async function rollback() {
  return await pool.rollback();
}
async function commit() {
  return await pool.commit();
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
