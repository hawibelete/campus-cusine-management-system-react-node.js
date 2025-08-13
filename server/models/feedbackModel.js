import db from "../config/db.js";

export const getFeedback = async () => {
  try {
    const [rows] = await db.query(`
        SELECT  
          f.Feedback_id AS feedbackId,
          CONCAT(u.f_name, ' ', u.l_name) AS customerName,
          u.email,
          u.image_url AS imageUrl,
          f.Rating AS rating,
          f.Comment AS comment,
          f.Added_at AS date,
          f.Responded AS status,
          l.Lounge_id AS loungeId,
          l.Name AS loungeName
        FROM feedback f
        JOIN users u ON f.User_id = u.User_id
        LEFT JOIN lounges l ON f.Lounge_id = l.Lounge_id

      `);
    return rows;
  } catch (error) {
    console.error("MySQL Error (getFeedback):", error);
    throw new Error(error.message);
  }
};

export const getFeedbackByLounge = async (loungeId) => {
  try {
    const [rows] = await db.query(
      `
        SELECT  
          f.Feedback_id AS id,    
          f.user_id,
          CONCAT(u.f_name, ' ', u.l_name) AS customerName,
          u.email,
          f.Rating AS rating,
          f.Comment AS comment,
          f.Added_at AS date
        FROM feedback f
        JOIN users u ON f.User_id = u.User_id
        WHERE f.Lounge_id = ?
      `,
      [loungeId]
    );
    return rows;
  } catch (error) {
    console.error("MySQL Error (getFeedbackByLounge):", error);
    throw new Error(error.message);
  }
};

export const createFeedback = async (
  userId,
  loungeId,
  Comment,
  rating,
  addedAt
) => {
  try {
    const [result] = await db.query(
      "INSERT INTO feedback (User_id, Lounge_id, Comment, Rating, Added_at) VALUES (?, ?, ?, ?, ?)",
      [userId, loungeId, Comment, rating, addedAt]
    );
    return { id: result.insertId, userId, loungeId, Comment, rating, addedAt };
  } catch (error) {
    console.error("MySQL Error (createFeedback):", error);
    throw new Error(error.Message);
  }
};
