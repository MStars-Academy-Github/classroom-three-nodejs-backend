const db = require("../db");
const bcrypt = require("bcryptjs");

async function registerUser(params) {
  const { firstname, lastname, email, address, phone_number, password } =
    params;
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("hashedpassword");
  console.log(hashedPassword);
  const data = await db.query(
    `insert into User (firstname ,lastname , 
  email, address , phone_number,password) values (?, ?, ?, ?, ?, ?)`,
    [firstname, lastname, email, address, phone_number, hashedPassword]
  );
  return {
    data,
  };
}

module.exports = {
  registerUser,
};
