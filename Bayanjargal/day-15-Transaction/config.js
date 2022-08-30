require("dotenv").config();
const HOST = process.env.HOST;
console.log(HOST);
const MYSQL_USER = process.env.USER_NAME;
console.log(MYSQL_USER);
const MYSQL_PASSWORD = process.env.PASSWORD;
console.log(MYSQL_PASSWORD);
const MYSQL_DATABASE = process.env.DATABASE;
const config = {
  db: {
    host: HOST,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
  },
};

module.exports = config;
