import db from "../config/db.js";

export const getOrders = async () => {
    try {
        const [rows] = await db.query(
            `SELECT 
                o.order_id,
                CONCAT(u.f_name, ' ', u.l_name) AS customer_name,
                o.total_price,
                o.status,
                o.added_at AS order_date,
                mi.name AS item_name,
                oi.quantity,
                oi.price
            FROM orders o
            JOIN users u ON o.user_id = u.user_id
            JOIN order_items oi ON o.order_id = oi.order_id
            JOIN menu_items mi ON oi.menu_item_id = mi.menu_item_id
            ORDER BY o.added_at DESC;`
        );
        return rows;
    } catch (error) {
        console.error("Error getting orders:", error);
        throw error;
    }
};


export const getOrdersByLounge = async (loungeId) => {
    try {
        const [rows] = await db.query(
            `SELECT 
                o.order_id,
                CONCAT(u.f_name, ' ', u.l_name) AS customer_name,
                u.username AS contact_number,
                o.total_price,
                o.status,
                o.added_at AS order_date,
                mi.name AS item_name,
                oi.quantity,
                oi.price
            FROM orders o
            JOIN users u ON o.user_id = u.user_id
            JOIN order_items oi ON o.order_id = oi.order_id
            JOIN menu_items mi ON oi.menu_item_id = mi.menu_item_id
            WHERE o.lounge_id = ?
            ORDER BY o.added_at DESC;`,
            [loungeId]
        );
        return rows;
    } catch (error) {
        console.error(`Error getting orders for lounge ID ${loungeId}:`, error);
        throw error;
    }
};


export const getOrder = async (id) => {
    try {
        const [rows] = await db.query("SELECT * FROM orders WHERE order_id = ?", [id]);
        return rows[0];
    } catch (error) {
        console.error(`Error getting order with ID ${id}:`, error);
        throw error;
    }
};

export const getOrderItems = async (orderId) => {
    try {
        const [rows] = await db.query(
            `SELECT oi.order_item_id, oi.menu_item_id, oi.quantity, oi.price, m.name AS menuItemName
             FROM order_items oi
             JOIN menu_items m ON oi.menu_item_id = m.menu_item_id
             WHERE oi.order_id = ?`,
            [orderId]
        );
        return rows;
    } catch (error) {
        console.error(`Error getting items for order ID ${orderId}:`, error);
        throw error;
    }
};

export const updateOrderStatus = async (orderId, status) => {
    try {
      await db.beginTransaction();
  
      const [updateResult] = await db.execute(
        "UPDATE orders SET status = ? WHERE order_id = ?",
        [status, orderId]
      );
  
      if (updateResult.affectedRows === 0) {
        await db.rollback();
        return false;
      }
  
      const [rows] = await db.execute(
        "SELECT user_id FROM orders WHERE order_id = ?",
        [orderId]
      );
  
      if (rows.length === 0 || !rows[0].user_id) {
        await db.rollback();
        throw new Error("User ID not found for the given order.");
      }
  
      const userId = rows[0].user_id;
      const message = `Your order #${orderId} status has been updated to "${status}".`;
  
      await db.execute(
        "INSERT INTO notifications (user_id, type, message, added_at) VALUES (?, ?, ?, NOW())",
        [userId, "order status update", message]
      );
  
      await db.commit();
      return true;
    } catch (error) {
      await db.rollback();
      console.error(`Error updating status for order ID ${orderId}:`, error);
      throw error;
    }
  };