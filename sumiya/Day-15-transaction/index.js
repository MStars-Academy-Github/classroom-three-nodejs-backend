const mysql = require("mysql2/promise");
const config = require("./config");

async function createOrder() {
  const items = ["RI0002", "CB0004"];

  const connection = await mysql.createConnection(config.db);
  console.log("Mysql Server succesfully connected");

  await connection.execute("SET TRANSACTION ISOLATION LEVEL READ COMMITTED");

  await connection.beginTransaction();
  try {
    await connection.execute(
      "SELECT id, name FROM product WHERE sku IN (?, ?) FOR UPDATE",
      items
    );

    const [itemsToOrder] = await connection.execute(
      "SELECT name, quantity, price FROM product WHERE sku in (?, ?) ORDER BY id",
      items
    );

    let orderTotal = 0;
    let orderItems = [];

    for (const itemToOrder of itemsToOrder) {
      if (itemToOrder.quantity < 1) {
        throw new Error(
          `One of the itesm is out of stock ${itemToOrder.quantity}`
        );
      }

      orderTotal += itemToOrder.price;
      orderItems.push(itemToOrder.name);
    }

    await connection.execute(
      "INSERT INTO sales_order (items, total) VALUES (?, ?)",
      [orderItems.join(), orderTotal]
    );

    console.log("Order created");

    await connection.execute(
      `UPDATE product SET quantity=quantity-1 WHERE sku IN (?,?)`,
      items
    );

    await connection.commit();
    const [rows] = await connection.execute(
      "SELECT LAST_INSERT_ID() as order_id"
    );

    return `Order created with id ${rows[0].order_id}`;
  } catch (error) {
    console.error(error);
    connection.rollback();
    console.info("Rollback succesful");
    return "error creating order";
  }
}

(async function testCreateOrder() {
  console.log(await createOrder());
  process.exit(0);
})();
