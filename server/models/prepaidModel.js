import db from "../config/db.js";

export const getPrepaidServiceOrders = async (userId) => {
  try {
    const [rows] = await db.query(
      `
        SELECT 
          p.payment_id AS id,
          DATE_FORMAT(p.added_at, '%Y-%m-%d') AS date,
          p.amount AS amount,
          GROUP_CONCAT(DISTINCT m.name ORDER BY m.name ASC SEPARATOR ', ') AS name
        FROM 
          payments p
        JOIN orders o ON p.order_id = o.order_id
        JOIN order_items oi ON o.order_id = oi.order_id
        JOIN menu_items m ON oi.menu_item_id = m.menu_item_id
        WHERE 
          p.type = 'payment'
          AND p.prepaid_id IS NOT NULL
          AND o.user_id = ?
        GROUP BY 
          p.payment_id, date, p.amount
        ORDER BY 
          p.added_at DESC
      `,
      [userId]
    );
    return rows;
  } catch (error) {
    console.error("🔥 MySQL Error (getPrepaidServiceOrders):", error);
    throw new Error("Failed to fetch prepaid service orders");
  }
};

export const getPrepaidServiceWallet = async (userId) => {
  try {
    const [rows] = await db.query(
      `
            SELECT 
                ps.remaining_balance AS balance,
                COALESCE(SUM(CASE WHEN p.type = 'deposit' THEN p.amount END), 0) AS totalDeposit,
                COALESCE(SUM(CASE WHEN p.type = 'payment' THEN p.amount END), 0) AS totalSpent,
                COALESCE(MAX(CASE WHEN p.type = 'payment' THEN p.added_at END), NULL) AS lastOrder,
                COUNT(DISTINCT o.order_id) AS numberOfOrders,
                l.lounge_id AS loungeId,
                l.name AS loungeName
            FROM 
                prepaid_services ps
            LEFT JOIN 
                payments p ON ps.prepaid_id = p.prepaid_id
            LEFT JOIN 
                orders o ON o.order_id = p.order_id
            LEFT JOIN 
                lounges l ON ps.lounge_id = l.lounge_id
            WHERE 
                ps.user_id = ?
            GROUP BY 
                ps.prepaid_id, ps.remaining_balance, l.lounge_id, l.name
            `,
      [userId]
    );

    return rows[0];
  } catch (error) {
    console.error("🔥 MySQL Error (getPrepaidServiceWallet):", error);
    throw new Error("Failed to fetch prepaid service wallet");
  }
};

export const isPrepaidServiceMember = async (userId) => {
  try {
    const [rows] = await db.query(
      `SELECT prepaid_id FROM prepaid_services WHERE user_id = ? LIMIT 1`,
      [userId]
    );
    return rows.length > 0;
  } catch (error) {
    console.error("🔥 MySQL Error (isPrepaidServiceMember):", error);
    throw new Error("Failed to check prepaid service membership");
  }
};

export const isUserPrepaidForLounge = async (userId, menuItemId) => {
  try {
    const [rows] = await db.query(
      `
            SELECT ps.prepaid_id
            FROM prepaid_services ps
            JOIN lounges l ON ps.lounge_id = l.lounge_id
            JOIN menu_items m ON m.lounge_id = l.lounge_id
            WHERE ps.user_id = ? AND m.menu_item_id = ?
            LIMIT 1;
        `,
      [userId, menuItemId]
    );
    return rows.length > 0;
  } catch (error) {
    console.error("🔥 MySQL Error (isUserPrepaidForLounge):", error);
    throw new Error("Failed to check prepaid status for lounge");
  }
};
export const placePrepaidOrderService = async (userId, items) => {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    const [loungeRes] = await conn.query(
      `
          SELECT l.lounge_id, l.discountPercentage
          FROM menu_items m
          JOIN lounges l ON m.lounge_id = l.lounge_id
          WHERE m.menu_item_id = ?
        `,
      [items[0].menu_item_id]
    );

    if (loungeRes.length === 0) throw new Error("Invalid menu item");
    const loungeId = loungeRes[0].lounge_id;
    const discountPercentage = loungeRes[0].discountPercentage || 0;

    const [walletRes] = await conn.query(
      `
          SELECT prepaid_id, remaining_balance FROM prepaid_services
          WHERE user_id = ? AND lounge_id = ? FOR UPDATE
        `,
      [userId, loungeId]
    );

    if (walletRes.length === 0)
      throw new Error("Not a prepaid member for this lounge");

    const { prepaid_id, remaining_balance } = walletRes[0];

    let total = 0;
    let discountTotal = 0;

    for (const item of items) {
      const [menuRes] = await conn.query(
        `SELECT price FROM menu_items WHERE menu_item_id = ?`,
        [item.menu_item_id]
      );

      if (menuRes.length === 0) throw new Error("Invalid item in cart");

      const basePrice = menuRes[0].price;
      const discountedPrice =
        basePrice - (basePrice * discountPercentage) / 100;

      total += discountedPrice * item.quantity;
      discountTotal += (basePrice - discountedPrice) * item.quantity;
    }

    if (total > remaining_balance)
      throw new Error("Insufficient prepaid balance");

    const [orderRes] = await conn.query(
      `INSERT INTO orders (user_id, lounge_id, status) VALUES (?, ?, 'placed')`,
      [userId, loungeId]
    );
    const orderId = orderRes.insertId;

    const orderItemQueries = items.map((item) =>
      conn.query(
        `INSERT INTO order_items (order_id, menu_item_id, quantity)
           VALUES (?, ?, ?)`,
        [orderId, item.menu_item_id, item.quantity]
      )
    );
    await Promise.all(orderItemQueries);

    await conn.query(
      `
          INSERT INTO payments (order_id, prepaid_id, type, amount, added_at)
          VALUES (?, ?, 'payment', ?, NOW())
        `,
      [orderId, prepaid_id, total]
    );

    await conn.query(
      `UPDATE prepaid_services SET remaining_balance = remaining_balance - ? WHERE prepaid_id = ?`,
      [total, prepaid_id]
    );

    await conn.commit();
    return { orderId };
  } catch (error) {
    await conn.rollback();
    console.error(
      "🔥 MySQL Transaction Error (placePrepaidOrderService):",
      error
    );
    throw new Error("Failed to place prepaid order");
  } finally {
    conn.release();
  }
};
