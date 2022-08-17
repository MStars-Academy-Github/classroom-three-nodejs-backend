const config = require("./config");
const mysql = require("mysql2/promise");
const pool = mysql.createPool(config.db);

async function query(sql, params) {
  const [rows, fields] = await pool.execute(sql, params);

  return rows;
}

module.exports = { query };
