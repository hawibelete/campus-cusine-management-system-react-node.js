import express from "express";
import { fetchCart, saveCart, clearCart, addOrUpdateCartItem } from "../controllers/cartController.js";
import { authenticateToken, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get("/", authenticateToken, authorizeRoles('customer'), fetchCart);
router.post("/", authenticateToken, authorizeRoles('customer'), saveCart);
router.post("/add", authenticateToken, authorizeRoles('customer'), addOrUpdateCartItem);
router.post("/clear", authenticateToken, authorizeRoles('customer'), clearCart);

export default router;
