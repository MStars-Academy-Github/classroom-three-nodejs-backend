require("dotenv").config();

const HOST = process.env.HOST;
console.log(HOST);
const MYSQL_USER = process.env.USER_NAME;
console.log(MYSQL_USER);
const MYSQL_PASSWORD = process.env.PASSWORD;
const MYSQL_DATABASE = process.env.DATABASE;

const config = {
  db: {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  },
};

module.exports = config;
