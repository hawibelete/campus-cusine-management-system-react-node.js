import db from "../config/db.js";

export const getLoungesWithRating = async () => {
  // noteforfuturehawi the lounge id retrieved as id
  try {
    const [rows] = await db.query(`
            SELECT 
                l.lounge_id AS id,
                l.name,
                l.image_url AS imageUrl,
                l.provides_delivery AS providesDelivery,
                l.description,
                COALESCE(ROUND(AVG(f.Rating), 1), 0) AS rating,
                c.discount_percentage
            FROM lounges l
            LEFT JOIN feedback f ON l.lounge_id = f.lounge_id
            LEFT JOIN prepaid_service_info c ON l.lounge_id = c.lounge_id
            GROUP BY l.lounge_id, l.name, l.description, c.discount_percentage
            ORDER BY rating DESC
        `);
    return rows;
  } catch (error) {
    console.error("🔥 MySQL Error (getLoungesWithRating):", error);
    throw new Error(error.message);
  }
};

export const createLounge = async (
  name,
  location,
  description,
  addedAt,
  chapaPublicKey,
  providesPrepaid,
  imageUrl,
  discountPercentage,
  minimumTopUp,
  additionalInfo,
  providesDelivery
) => {
  try {
    await db.beginTransaction();

    const [result] = await db.query(
      `INSERT INTO lounges 
         (name, location, description, added_at, chapa_public_key, image_url, provides_delivery, provides_prepaid)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        location,
        description,
        addedAt,
        chapaPublicKey,
        imageUrl,
        providesDelivery,
        providesPrepaid,
      ]
    );

    const loungeId = result.insertId;

    await db.query(
      `INSERT INTO prepaid_service_info 
         (lounge_id, discount_percentage, minimum_top_up, additional_info)
         VALUES (?, ?, ?, ?)`,
      [loungeId, discountPercentage, minimumTopUp, additionalInfo]
    );

    await db.commit();

    return {
      loungeId,
      name,
      location,
      description,
      addedAt,
      chapaPublicKey,
      imageUrl,
      providesDelivery,
      providesPrepaid,
      prepaidServiceInfo: {
        discountPercentage,
        minimumTopUp,
        additionalInfo,
      },
    };
  } catch (error) {
    await db.rollback();
    console.error("❌ Error creating lounge and prepaid info:", error);
    throw error;
  }
};

export const getAllLounges = async () => {
  try {
    const [rows] = await db.query(`
            SELECT 
                l.*,
                p.discount_percentage,
                p.minimum_top_up,
                p.additional_info
            FROM lounges l
            LEFT JOIN prepaid_service_info p
                ON l.lounge_id = p.lounge_id
        `);
    return rows;
  } catch (error) {
    console.error("Error fetching all lounges:", error);
    throw error;
  }
};

export const getLoungeById = async (loungeId) => {
  try {
    const [loungeRows] = await db.query(
      "SELECT * FROM lounges WHERE lounge_id = ?",
      [loungeId]
    );
    const lounge = loungeRows[0];
    if (!lounge) return null;

    const [feedbackStatsRows] = await db.query(
      "SELECT COUNT(*) AS feedbackCount, ROUND(AVG(rating), 1) AS averageRating FROM feedback WHERE lounge_id = ?",
      [loungeId]
    );
    const feedbackCount = feedbackStatsRows[0]?.feedbackCount || 0;
    const averageRating = feedbackStatsRows[0]?.averageRating || null;
    const [menuItems] = await db.query(
      "SELECT * FROM menu_items WHERE lounge_id = ?",
      [loungeId]
    );

    const [prepaidRows] = await db.query(
      "SELECT discount_percentage AS discountPercentage, minimum_top_up AS minimumTopUp, additional_info AS additionalInfo FROM prepaid_service_info WHERE lounge_id = ?",
      [loungeId]
    );
    const prepaidServiceInfo = prepaidRows[0] || null;

    return {
      ...lounge,
      feedbackCount,
      averageRating,
      menuItems,
      prepaidServiceInfo,
    };
  } catch (error) {
    console.error(`Error fetching lounge with ID ${loungeId}:`, error);
    throw error;
  }
};

export const updateLounge = async (
    loungeId,
    name,
    location,
    description,
    chapaPublicKey,
    providesPrepaid,
    imageUrl,
    discountPercentage,
    minimumTopUp,
    additionalInfo,
    providesDelivery
  ) => {
    try {
      await db.beginTransaction();
  
      const [loungeResult] = await db.query(
        `UPDATE lounges
           SET name = ?, location = ?, description = ?, chapa_public_key = ?, image_url = ?, provides_delivery = ?, provides_prepaid = ?
           WHERE lounge_id = ?`,
        [
          name,
          location,
          description,
          chapaPublicKey,
          imageUrl,
          providesDelivery,
          providesPrepaid,
          loungeId,
        ]
      );
  
      let prepaidResult = { affectedRows: 0 };
  
      if (providesPrepaid) {
        const [result] = await db.query(
          `INSERT INTO prepaid_service_info (lounge_id, discount_percentage, minimum_top_up, additional_info)
             VALUES (?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE
               discount_percentage = VALUES(discount_percentage),
               minimum_top_up = VALUES(minimum_top_up),
               additional_info = VALUES(additional_info)`,
          [loungeId, discountPercentage, minimumTopUp, additionalInfo]
        );
        prepaidResult = result;
      } else {
        await db.query(
          `DELETE FROM prepaid_service_info WHERE lounge_id = ?`,
          [loungeId]
        );
      }
  
      await db.commit();
  
      const updated =
        loungeResult.affectedRows > 0 || prepaidResult.affectedRows > 0;
      return updated;
    } catch (error) {
      await db.rollback();
      console.error(`❌ Error updating lounge ID ${loungeId}:`, error);
      throw error;
    }
  };  

export const deleteLounge = async (loungeId) => {
  try {
    await db.beginTransaction();

    await db.query(
      "DELETE FROM payments WHERE order_id IN (SELECT order_id FROM orders WHERE lounge_id = ?)",
      [loungeId]
    );

    await db.query("DELETE FROM feedback WHERE lounge_id = ?", [loungeId]);
    await db.query(
      "DELETE FROM favorites WHERE menu_item_id IN (SELECT menu_item_id FROM menu_items WHERE lounge_id = ?)",
      [loungeId]
    );
    await db.query(
        "DELETE FROM order_items WHERE menu_item_id IN (SELECT menu_item_id FROM menu_items WHERE lounge_id = ?)",
        [loungeId]
      );      
    await db.query("DELETE FROM menu_items WHERE lounge_id = ?", [loungeId]);
    await db.query("DELETE FROM lounge_staff WHERE lounge_id = ?", [loungeId]);
    await db.query("DELETE FROM prepaid_service_info WHERE lounge_id = ?", [
      loungeId,
    ]);
    await db.query("DELETE FROM prepaid_services WHERE lounge_id = ?", [
      loungeId,
    ]);

    await db.query("DELETE FROM orders WHERE lounge_id = ?", [loungeId]);

    const [result] = await db.query("DELETE FROM lounges WHERE lounge_id = ?", [
      loungeId,
    ]);

    await db.commit();

    return result.affectedRows > 0;
  } catch (error) {
    await db.rollback();
    console.error(`❌ Error deleting lounge ID ${loungeId}:`, error);
    throw error;
  }
};
