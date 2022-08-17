const mysql = require("mysql2/promise");
const config = require("./config");

async function createOrder() {
  const items = ["RI002", "CB004"];

  const connection = await mysql.createConnection(config.db);
  console.log("server successfully connected");

  await connection.execute("SET TRANSACTION ISOLATION LEVEL READ COMMITTED");

  await connection.beginTransaction();
  try {
    await connection.execute(
      "SELECT id , name from product where sku in (?, ?) for UPDATE",
      items
    );
    const [itemsToOrder] = await connection.execute(
      "SELECT name , quantity , price from product where sku in (?, ?) Order by id",
      items
    );
    let orderTotal = 0;
    let orderItems = [];

    for (const itemToOrder of itemsToOrder) {
      if (itemToOrder.quantity < 1) {
        throw new Error(
          "one of the items is out of stock" + itemToOrder.quantity
        );
      } else {
        orderTotal += itemToOrder.price;
        orderItems.push(itemToOrder.name);
      }
    }
    await connection.execute(
      "insert into sales_order (items, total) values(?, ?)",
      [orderItems.join(), orderTotal]
    );
    console.log("Order created");

    await connection.execute(
      `Update product set quantity = quantity-1 where sku in (?, ?)`,
      items
    );
    await connection.commit();
    const [rows] = await connection.execute(
      "SELECT LAST_INSERT_ID() as order_id"
    );

    return `order created with id ${rows[0].order_id}`;
  } catch (error) {
    console.error(error.message);
    connection.rollback();
    console.info("Rollback successful");
    return "error creating order";
  }
}

(async function testCreateOrder() {
  console.log(await createOrder());
  process.exit(0);
})();
