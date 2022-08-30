const mysql = require("mysql2/promise");
const config = require("./config");
const pool = mysql.createPool(config.db);
const connection = mysql.createConnection(config.db);

async function query(sql, params) {
  const [rows, fields] = await pool.execute(sql, params);
  return rows;
}

async function beginTransation() {
  pool.getConnection((err, connection) => {
    connection.beginTransation();
  });
}

async function roleBack() {
  return await connection.roleBack();
}

async function commit() {
  return await connection.commit();
}

module.exports = { query, beginTransation, roleBack, commit };
