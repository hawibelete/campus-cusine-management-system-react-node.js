import express from "express";
import {
    fetchPrepaidServices,
    updatePrepaidServiceInfoForLounge
} from "../controllers/prepaidServiceController.js";
import { authenticateToken, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authenticateToken, authorizeRoles("lounge_staff"), fetchPrepaidServices);
router.put("/info/:loungeId", authenticateToken, authorizeRoles("lounge_staff"), updatePrepaidServiceInfoForLounge);

export default router;
