const mysql = require("mysql2/promise");
const config = require("./config");
const pool = mysql.createPool(config.db);

async function query(sql, params) {
  const [rows, fields] = await pool.execute(sql, params);

  return rows;
}

async function beginTransaction() {
  pool.getConnection((err, connection) => {
    connection.beginTransaction((err) => {
      if (err) {
        connection.rollBack();
      }
    });
  });
}

async function rollBack() {
  const connection = mysql.createConnection(config.db);
  await connection.rollBack();
}

async function commit() {
  const connection = mysql.createConnection(config.db);
  await connection.commit();
}

module.exports = {
  query,
  beginTransaction,
  rollBack,
  commit,
};
