import db from "../config/db.js";

export const getUserByUsername = async (username) => {
    if (!username) return null;

    try {
        const [userResults] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        if (userResults.length) return { ...userResults[0], role: 'customer' };

        const [staffResults] = await db.query('SELECT * FROM lounge_staff WHERE username = ?', [username]);
        if (staffResults.length) return { ...staffResults[0], role: 'lounge_staff' };

        const [adminResults] = await db.query('SELECT * FROM admin WHERE username = ?', [username]);
        if (adminResults.length) return { ...adminResults[0], role: 'admin' };

        return null;
    } catch (err) {
        console.error("DB error:", err);
        throw err;
    }
};

export const createUser = async (fName, lName, email, username, password) => {
    const formattedDate = new Date().toISOString().split("T")[0];

    try {
        const [result] = await db.query(
            "INSERT INTO users (f_name, l_name, email, username, password, added_at) VALUES (?, ?, ?, ?, ?, ?)",
            [fName, lName, email, username, password, formattedDate]
        );

        return { id: result.insertId, fName, lName, email, username, formattedDate };
    } catch (error) {
        console.error("MySQL Error:", error);
        throw new Error(error.message);
    }
};

export const getUsers = async () => {
    try {
        const [rows] = await db.query("SELECT * FROM users");
        return rows;
    } catch (error) {
        console.error("Error getting users:", error);
        throw error;
    }
};

export const getUser = async (id) => {
    try {
        const [rows] = await db.query("SELECT * FROM users WHERE user_id = ?", [id]);
        return rows[0]; 
    } catch (error) {
        console.error(`Error getting user with ID ${id}:`, error);
        throw error;
    }
};

export const updateUser = async (id, fName, lName, email, username) => {
    try {
        const [result] = await db.query(
            "UPDATE users SET f_name = ?, l_name = ?, email = ?, username = ? WHERE user_id = ?",
            [fName, lName, email, username, id]
        );
        return result.affectedRows > 0; 
    } catch (error) {
        console.error(`Error updating user with ID ${id}:`, error);
        throw error;
    }
};

export const deleteUser = async (id) => {
    try {
        const [result] = await db.query("DELETE FROM users WHERE user_id = ?", [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error(`Error deleting user with ID ${id}:`, error);
        throw error;
    }
};

export const getUserProfile = async (userId) => {
    try {
      // Fetch full user data
      const [userRows] = await db.query(
        'SELECT * FROM users WHERE user_id = ?',
        [userId]
      );
  
      if (userRows.length === 0) {
        throw new Error('User not found');
      }
  
      const user = userRows[0];
  
      // Fetch user's favorite menu item IDs
      const [favorites] = await db.query(
        'SELECT menu_item_id FROM favorites WHERE user_id = ?',
        [userId]
      );
  
     
  
      return {
        user,
        favorites: favorites.map(f => f.menu_item_id),
      };
    } catch (err) {
      console.error('Error in getUserProfile:', err);
      throw err;
    }
  };
  
  
  export const toggleLike = async (userId, menuItemId) => {
    const [existing] = await db.query(
      'SELECT * FROM likes WHERE user_id = ? AND menu_item_id = ?',
      [userId, menuItemId]
    );
  
    if (existing.length) {
      await db.query(
        'DELETE FROM likes WHERE user_id = ? AND menu_item_id = ?',
        [userId, menuItemId]
      );
    } else {
      await db.query(
        'INSERT INTO likes (user_id, menu_item_id, liked_at) VALUES (?, ?, CURDATE())',
        [userId, menuItemId]
      );
    }
  
    const [likedItems] = await db.query(
      'SELECT menu_item_id FROM likes WHERE user_id = ?',
      [userId]
    );
    return likedItems.map(l => l.menu_item_id);
  };
  
