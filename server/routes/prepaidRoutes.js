import express from "express";
import { fetchPrepaidOrders, fetchPrepaidWallet, checkPrepaidMembership, checkPrepaidStatusForLounge, placePrepaidOrder } from "../controllers/prepaidController.js";
import { authenticateToken, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/wallet", authenticateToken, authorizeRoles("customer"), fetchPrepaidWallet);
router.get("/orders", authenticateToken, authorizeRoles("customer"), fetchPrepaidOrders);
router.get("/check-membership", authenticateToken, authorizeRoles("customer"), checkPrepaidMembership);
router.get("/prepaid-status/:id", authenticateToken, authorizeRoles("customer"), checkPrepaidStatusForLounge);
router.post("/place-prepaid-order", authenticateToken, authorizeRoles("customer"), placePrepaidOrder);

export default router;
