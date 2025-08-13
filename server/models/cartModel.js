import db from "../config/db.js";

export const getCartByUserId = async (userId) => {
  try {
    const [rows] = await db.query(
      `
      SELECT 
        ci.cart_item_id AS id,
        ci.user_id,
        ci.menu_item_id,
        ci.quantity,
        ci.added_at,
        mi.name,
        mi.price,
        mi.image_url AS image
      FROM cart_items ci
      JOIN menu_items mi ON ci.menu_item_id = mi.menu_item_id
      WHERE ci.user_id = ?
      `,
      [userId]
    );
    return rows;
  } catch (error) {
    console.error("MySQL Error (getCartByUserId):", error);
    throw new Error(error.message);
  }
};


export const upsertCartItem = async (userId, menuItemId, quantity) => {
  try {
    await db.query(
      `
      INSERT INTO cart_items (user_id, menu_item_id, quantity, added_at)
      VALUES (?, ?, ?, NOW())
      ON DUPLICATE KEY UPDATE quantity = VALUES(quantity), added_at = NOW()
    `,
      [userId, menuItemId, quantity]
    );
  } catch (error) {
    console.error("MySQL Error (upsertCartItem):", error);
    throw new Error(error.message);
  }
};

export const clearCartByUserId = async (userId) => {
  try {
    await db.query(`DELETE FROM cart_items WHERE user_id = ?`, [userId]);
  } catch (error) {
    console.error("MySQL Error (clearCartByUserId):", error);
    throw new Error(error.message);
  }
};
