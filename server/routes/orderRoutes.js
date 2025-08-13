import express from "express";
import {
    fetchAllOrders,
    fetchOrderDetails,
    updateOrder
} from "../controllers/orderController.js";
import { authenticateToken, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authenticateToken, authorizeRoles("admin", "lounge_staff"), fetchAllOrders);
router.get("/:id/details", authenticateToken, authorizeRoles("admin", "lounge_staff"), fetchOrderDetails);
router.patch("/:id", authenticateToken, authorizeRoles("lounge_staff"), updateOrder);

export default router;
