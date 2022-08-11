require("dotenv").config();

const HOST = process.env.HOST;
console.log(HOST);
const MYSQL_USER = process.env.USER_NAME;
console.log(MYSQL_USER);
const MYSQL_PASSWORD = process.env.PASSWORD;
console.log(MYSQL_PASSWORD);
const MYSQL_DATABASE = process.env.DATABASE;
console.log(MYSQL_DATABASE);

const config = {
  db: {
    host: process.env.HOST,
    user: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  },
};

module.exports = config;
