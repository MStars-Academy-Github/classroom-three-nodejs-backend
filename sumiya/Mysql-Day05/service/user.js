const db = require("../db");

async function getAllUser() {
  const data = await db.query("select * from User");
  const params = {};
  return {
    data,
    params,
  };
}

async function insertUser(params) {
  const firstname = params.firstname;
  const lastname = params.lastname;
  const email = params.email;
  const address = params.address;
  const phone_number = params.phone_number;
  const rode_id = params.rode_id;
  const data = await db.query(
    `insert into User (firstname, lastname, email ,address,phone_number,rode_id) 
values (? , ? , ? , ? , ? , ?)`,
    [firstname, lastname, email, address, phone_number, rode_id]
  );

  return {
    data,
    params,
  };
}
async function UpdateUser(params) {
  console.log(params);
  const firstname = params.firstname;
  const lastname = params.lastname;
  const email = params.email;
  const address = params.address;
  const phone_number = params.phone_number;
  const rode_id = params.rode_id;
  const id = params.id;
  const data = await db.query(
    `update User set firstname=?, lastname=?, email=? ,
    address=?, phone_number=?, rode_id=? where id =?`,
    [firstname, lastname, email, address, phone_number, rode_id, id]
  );
  return {
    data,
  };
}
async function getUserById(id) {
  const data = await db.query("select * from User where id=?", [id]);
  const params = {};
  return {
    data,
    params,
  };
}

module.exports = {
  getAllUser,
  insertUser,
  UpdateUser,
  getUserById,
};
