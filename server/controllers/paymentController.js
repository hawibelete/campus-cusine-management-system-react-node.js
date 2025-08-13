import db from "../config/db.js";

export const handleCashOrder = async (req, res) => {
  const {
    items,
    total,
    subtotal,
    shippingFee,
    deliveryNote,
    menuItemId,
    deliveryMethod,
    paymentMethod
  } = req.body;

  const userId = req.user.id; 
  const loungeId = menuItemId; 

  try {
    const added_at = new Date().toISOString().split('T')[0];
    const [orderResult] = await db.query(
      `INSERT INTO orders (user_id, lounge_id, total_price, status, added_at) VALUES (?, ?, ?, ?, ?)`,
      [userId, loungeId, total, "pending", added_at]
    );
    const orderId = orderResult.insertId;

    const orderItemsData = items.map(item => [
      orderId,
      item.menu_item_id,
      item.quantity,
      item.price
    ]);

    await db.query(
      `INSERT INTO order_items (order_id, menu_item_id, quantity, price) VALUES ?`,
      [orderItemsData]
    );

    await db.query(
      `INSERT INTO payments (order_id, amount, status, type, added_at) VALUES (?, ?, ?, ?, ?)`,
      [orderId, total, "not paid", "cash", added_at]
    );

    res.status(201).json({ message: "Cash order placed successfully" });
  } catch (err) {
    console.error("Cash order error:", err);
    res.status(500).json({ error: "Failed to process cash order" });
  }
};
