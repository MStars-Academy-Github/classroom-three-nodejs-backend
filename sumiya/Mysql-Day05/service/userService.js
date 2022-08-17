const db = require("../db");

async function findUserbyEmail(email) {
  const data = await db.query(`select * from User where email =? `, [email]);
  return {
    data,
  };
}

module.exports = {
  findUserbyEmail,
};
