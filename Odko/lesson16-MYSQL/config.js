require("dotenv").config();

const MYSQL_HOST = process.env.HOST_NAME;
const MYSQL_USER = process.env.USER_NAME;
const MYSQL_PASSWORD = process.env.PASSWORD;
const MYSQL_DATABASE = process.env.DATABASE;

const config = {
  db: {
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
  },
};

module.exports = config;
