import express from "express";
import { fetchFeedback, submitFeedback } from "../controllers/feedbackController.js";
import { authenticateToken, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get("/", authenticateToken, authorizeRoles('admin', 'lounge_staff', 'customer'), fetchFeedback);
router.post("/", authenticateToken, authorizeRoles('customer'), submitFeedback);  

export default router;
