import express from "express";
import db from "../config/db.js";
import { v4 as uuidv4 } from "uuid";
import mysql from "mysql2/promise";
import {
  authenticateToken,
  authorizeRoles,
} from "../middleware/authMiddleware.js";
import { handleCashOrder } from "../controllers/paymentController.js";
const router = express.Router();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

async function getLoungePublicKey(loungeId) {
  const connection = await pool.getConnection();
  const [rows] = await connection.execute(
    "SELECT chapa_public_key FROM lounges WHERE Lounge_id = ?",
    [loungeId]
  );
  connection.release();
  return rows.length > 0 ? rows[0].chapa_public_key : null;
}

router.post(
  "/initiate",
  authenticateToken,
  authorizeRoles("customer"),
  express.json(),
  async (req, res) => {
    const { menuItemId } = req.body;
    const total = req.body.total || 0; 
    const userId = req.user.id;
    try {
      const connection = await pool.getConnection();
      const [menuRows] = await connection.execute(
        "SELECT lounge_id FROM menu_items WHERE menu_item_id = ?",
        [menuItemId]
      );
      connection.release();

      if (menuRows.length === 0 || !menuRows[0].lounge_id) {
        return res
          .status(400)
          .json({ message: "Lounge ID not found for the given menu item" });
      }

      const loungeId = menuRows[0].lounge_id;
      console.log("Lounge ID retrieved from menu item:", loungeId);
      const chapaPublicKey = await getLoungePublicKey(loungeId);
      if (!chapaPublicKey) {
        return res.status(404).json({ message: "Lounge Chapa key not found" });
      }

      console.log(
        "Chapa Public Key returned from getLoungePublicKey:",
        chapaPublicKey
      );

      const tx_ref = `tx-${uuidv4()}`;
      console.log(
        "******************************************************************"
      );
      console.log("Generated transaction ref:", tx_ref);
      console.log("Lounge ID for checkout URL:", loungeId);
      const chapa_url = `/chapa/payment?tx_ref=${tx_ref}&lounge_id=${loungeId}&amount=${total}&user_id=${userId}&lounge_id=${loungeId}&type=cart`;
      console.log("Checkout URL:", chapa_url);
      res.status(200).json({ chapa_url });
    } catch (error) {
      console.error("Error initiating Chapa payment:", error);
      res.status(500).json({ message: "Failed to initialize payment" });
    }
  }
);

router.post(
  "/prepaid/initiate",
  authenticateToken,
  authorizeRoles("customer"),
  express.json(),
  async (req, res) => {
    const { amount, loungeId } = req.body;

    const userId = req.user.id;
    console.log("**********************************************");
    console.log("User ID from request:", userId);
    console.log("Lounge ID from request:", loungeId);
    console.log("Amount from request:", amount);
    if (!amount || amount <= 0 || isNaN(amount)) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    try {
      const connection = await pool.getConnection();

      const [rows] = await connection.execute(
        "SELECT chapa_public_key FROM lounges WHERE Lounge_id = ?",
        [loungeId]
      );
      connection.release();

      if (!rows.length) {
        return res
          .status(404)
          .json({ message: "Chapa key not found for lounge" });
      }

      const tx_ref = `wallet-topup-${uuidv4()}`;
      const chapa_url = `/chapa/payment?tx_ref=${tx_ref}&amount=${amount}&user_id=${userId}&lounge_id=${loungeId}&type=wallet`;

      console.log("Redirecting to:", chapa_url);
      res.status(200).json({ chapa_url });
    } catch (err) {
      console.error("Wallet top-up initiation failed:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

router.post(
  "/cash-order",
  authenticateToken,
  authorizeRoles("customer"),
  handleCashOrder
);

router.get("/unpaid-cash-orders",
  authenticateToken,
  authorizeRoles("lounge_staff"), async (req, res) => {
  const loungeId = req.user.loungeId; 
  if (!loungeId) {
    return res.status(400).json({ error: "Lounge ID missing in token" });
  }

  try {
    const [rows] = await db.query(`
      SELECT o.order_id, o.total_price, o.status AS order_status, o.added_at AS orderDate,
             CONCAT(u.f_name, ' ', u.l_name) AS customerName,  
             JSON_ARRAYAGG(JSON_OBJECT('itemName', m.name, 'quantity', oi.quantity)) AS items
      FROM orders o
      JOIN payments p ON o.order_id = p.order_id
      JOIN users u ON o.user_id = u.user_id
      JOIN order_items oi ON o.order_id = oi.order_id
      JOIN menu_items m ON oi.menu_item_id = m.menu_item_id
      WHERE p.status = 'not paid' AND p.type = 'cash' AND o.lounge_id = ?
      GROUP BY o.order_id
      ORDER BY o.added_at DESC
    `, [loungeId]);

    res.json(rows);
  } catch (err) {
    console.error("Error fetching unpaid cash orders:", err);
    res.status(500).json({ error: "Failed to fetch unpaid cash orders." });
  }
});

router.patch("/mark-cash-paid/:orderId",
  authenticateToken,
  authorizeRoles("lounge_staff"), async (req, res) => {
  const { orderId } = req.params;

  try {
    const [result] = await db.execute(
      "UPDATE payments SET status = 'completed', added_at = NOW() WHERE order_id = ? AND type = 'cash'",
      [orderId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Payment not found or already paid." });
    }

    res.json({ success: true, message: "Payment marked as completed." });
  } catch (err) {
    console.error("Failed to update payment:", err);
    res.status(500).json({ message: "Internal server error." });
  }
});


export default router;
