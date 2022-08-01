require('dotenv').config()

const HOST = process.env.HOST;
const MYSQL_USER = process.env.USER_NAME;
const MYSQL_PASSWORD = process.env.PASSWORD;
const MYSQL_DATABASE =  process.env.DATABASE; 



console.log(HOST);
console.log(MYSQL_USER);
console.log(MYSQL_PASSWORD);
console.log(MYSQL_DATABASE);


const config = {
	db : {
	host : HOST,
	user : MYSQL_USER,
	password : MYSQL_PASSWORD,
	database : MYSQL_DATABASE,
	}	
}

module.exports = config;
