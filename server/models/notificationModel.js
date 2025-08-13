import db from "../config/db.js";

export const createNotification = async (userId, message, feedbackId) => {
  try {
    const query = `
      INSERT INTO notifications (user_id, type, message, added_at)
      VALUES (?, 'feedback response', ?, NOW())
    `;
    await db.query(query, [userId, message]);

    await db.query(
      `UPDATE feedback SET responded = true WHERE feedback_id = ?`,
      [feedbackId]
    );
  } catch (error) {
    console.error('Database error in createNotification:', error);
    throw error;
  }
};

export const fetchNotificationsByUser = async (userId) => {
  try {
    const [rows] = await db.query(
      `SELECT 
         notification_id AS id,
         type,
         message AS description,
         added_at AS timestamp,
         is_read AS isRead
       FROM notifications
       WHERE user_id = ? OR (user_id IS NULL AND type = 'new menu item')
       ORDER BY added_at DESC`,
      [userId]
    );
    return rows;
  } catch (error) {
    console.error('Database error in fetchNotificationsByUser:', error);
    throw error;
  }
};

export const updateNotificationReadStatus = async (notificationId) => {
  try {
    console.log('Updating notification read status for ID in the model:', notificationId);
    await db.query(
      `UPDATE notifications SET is_read = true WHERE notification_id = ?`,
      [notificationId]
    );
  } catch (error) {
    console.error('Database error in updateNotificationReadStatus:', error);
    throw error;
  }
};

export const markAllNotificationsRead = async (userId) => {
  try {
    await db.query(
      `UPDATE notifications SET is_read = true WHERE user_id = ?`,
      [userId]
    );
  } catch (error) {
    console.error('Database error in markAllNotificationsRead:', error);
    throw error;
  }
};
