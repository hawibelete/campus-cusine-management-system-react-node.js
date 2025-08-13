import express from "express";
import mysql from "mysql2/promise";

const router = express.Router();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

router.post("/initiate", express.json(), async (req, res) => {
  const event = req.body;

  if (event.status !== "success") {
    return res.status(200).send("Non-successful payment ignored");
  }

  const { tx_ref, amount, custom_fields } = event;

  const lounge_id =
    custom_fields?.find((f) => f.key === "lounge_id")?.value || null;
  const user_id =
    custom_fields?.find((f) => f.key === "user_id")?.value || null;
  const type = custom_fields?.find((f) => f.key === "type")?.value || "cart";
  const added_at = new Date();

  try {
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    if (type === "wallet") {
      const [rows] = await connection.execute(
        `SELECT prepaid_id FROM prepaid_services WHERE user_id = ? AND lounge_id = ?`,
        [user_id, lounge_id]
      );

      let prepaid_id;

      if (rows.length > 0) {
        prepaid_id = rows[0].prepaid_id;
        await connection.execute(
          `UPDATE prepaid_services 
     SET prepaid_amount = prepaid_amount + ?, 
         remaining_balance = remaining_balance + ?, 
         added_at = ?
     WHERE prepaid_id = ?`,
          [amount, amount, new Date(), prepaid_id]
        );
      } else {
        // Insert new row
        const [insertResult] = await connection.execute(
          `INSERT INTO prepaid_services (user_id, lounge_id, prepaid_amount, remaining_balance, added_at)
     VALUES (?, ?, ?, ?, ?)`,
          [user_id, lounge_id, amount, amount, new Date()]
        );
        prepaid_id = insertResult.insertId;
      }

      // Record payment with type = 'wallet'
      await connection.execute(
        `INSERT INTO payments (tx_ref, amount, status, added_at, prepaid_id, type)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [tx_ref, amount, "completed", added_at, prepaid_id, "deposit"]
      );
    } else {
      // CART PAYMENT LOGIC
      const [cartItems] = await connection.execute(
        "SELECT * FROM cart_items WHERE user_id = ?",
        [user_id]
      );

      if (cartItems.length === 0) {
        await connection.rollback();
        connection.release();
        return res.status(400).send("Cart is empty.");
      }

      let totalPrice = 0;
      for (const item of cartItems) {
        const [menuData] = await connection.execute(
          "SELECT price FROM menu_items WHERE menu_item_id = ?",
          [item.menu_item_id]
        );
        totalPrice += parseFloat(menuData[0].price) * item.quantity;
      }

      const [orderResult] = await connection.execute(
        `INSERT INTO orders (user_id, lounge_id, total_price, status, added_at)
         VALUES (?, ?, ?, ?, ?)`,
        [user_id, lounge_id, totalPrice, "completed", added_at]
      );
      const order_id = orderResult.insertId;

      for (const item of cartItems) {
        const [menuData] = await connection.execute(
          "SELECT price FROM menu_items WHERE menu_item_id = ?",
          [item.menu_item_id]
        );
        await connection.execute(
          `INSERT INTO order_items (order_id, menu_item_id, quantity, price)
           VALUES (?, ?, ?, ?)`,
          [order_id, item.menu_item_id, item.quantity, menuData[0].price]
        );
      }

      await connection.execute("DELETE FROM cart_items WHERE user_id = ?", [
        user_id,
      ]);

      await connection.execute(
        `INSERT INTO payments (order_id, tx_ref, amount, status, added_at, type)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [order_id, tx_ref, amount, "completed", added_at, "cart"]
      );
    }

    await connection.commit();
    connection.release();
    return res.status(200).send("Payment processed.");
  } catch (error) {
    console.error("Webhook error:", error);
    return res.status(500).send("Webhook handling failed.");
  }
});

export default router;
