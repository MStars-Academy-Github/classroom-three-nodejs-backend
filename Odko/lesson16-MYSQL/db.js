const mysql = require("mysql2/promise");
const config = require("./config");
const pool = mysql.createPool(config.db);

async function query(sql, params) {
  const [rows, fields] = await pool.execute(sql, params);
  return rows;
}

async function beginTransation() {
  return await pool.beginTransation();
}

async function roleBack() {
  return await pool.roleBack();
}

async function commit() {
  return await pool.commit();
}

module.exports = { query, beginTransation, roleBack, commit };
