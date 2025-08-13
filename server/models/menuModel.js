import db from '../config/db.js';

export const createMenuItem = async (loungeId, name, price, description, availability, added_at) => {
  try {
    await db.beginTransaction();

    const formattedDate = new Date(added_at).toISOString().split('T')[0];
    const [result] = await db.execute(
      "INSERT INTO menu_items (lounge_id, name, price, description, availability, added_at) VALUES (?, ?, ?, ?, ?, ?)",
      [loungeId, name, price, description, availability, formattedDate]
    );

    const userId = 1; // You might want to replace this with a dynamic user ID
    const message = `A new menu item "${name}" has been added.`;
    await db.execute(
      "INSERT INTO notifications (user_id, type, message, added_at) VALUES (?, ?, ?, NOW())",
      [userId, "new menu item", message]
    );

    await db.commit();

    return {
      id: result.insertId,
      loungeId,
      name,
      price,
      description,
      availability,
      added_at: formattedDate,
    };
  } catch (error) {
    await db.rollback();
    console.error("MySQL Error:", error);
    throw new Error(error.message);
  }
};


export const getMenuItems = async () => {
    try {
        const [rows] = await db.query("SELECT * FROM menu_items");
        return rows;
    } catch (error) {
        console.error("MySQL Error:", error);
        throw new Error(error.message);
    }
};

export const getMenuItemById = async (menuItemId) => {
    try {
        const [rows] = await db.query("SELECT * FROM menu_items WHERE menu_item_id = ?", [menuItemId]);
        return rows[0]; 
    } catch (error) {
        console.error("MySQL Error:", error);
        throw new Error(error.message);
    }
};

export const getMenuItemsByLounge = async (loungeId) => {
    try {
        const [rows] = await db.query("SELECT * FROM menu_items WHERE lounge_id = ?", [loungeId]);
        return rows;
    } catch (error) {
        console.error("MySQL Error:", error);
        throw new Error(error.message);
    }
};

export const updateMenuItem = async (menuItemId, name, price, description, availability) => {
    try {
        const [result] = await db.query(
            "UPDATE menu_items SET name = ?, price = ?, description = ?, availability = ? WHERE menu_item_id = ?",
            [name, price, description, availability, menuItemId]
        );
        return result.affectedRows > 0; 
    } catch (error) {
        console.error("MySQL Error:", error);
        throw new Error(error.message);
    }
};

export const deleteMenuItem = async (menuItemId) => {
    try {
        const [result] = await db.query("DELETE FROM menu_items WHERE menu_item_id = ?", [menuItemId]);
        return result.affectedRows > 0; 
    } catch (error) {
        console.error("MySQL Error:", error);
        throw new Error(error.message);
    }
};

export const getPopularMenuItems = async (limit = 5) => {
    try {
        const [rows] = await db.query(`
            SELECT 
                mi.*, 
                SUM(oi.quantity) AS total_ordered
            FROM 
                order_items oi
            JOIN 
                menu_items mi ON oi.menu_item_id = mi.menu_item_id
            GROUP BY 
                oi.menu_item_id
            ORDER BY 
                total_ordered DESC
            LIMIT ?
        `, [limit]);

        return rows;
    } catch (error) {
        console.error("MySQL Error (Popular Items):", error);
        throw new Error(error.message);
    }
};
