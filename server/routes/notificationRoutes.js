import express from 'express';
import { respondToFeedback, getUserNotifications, markNotificationAsRead, markAllNotificationsAsRead } from '../controllers/notificationController.js';
import { authenticateToken, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get('/', authenticateToken, authorizeRoles("customer"), getUserNotifications); 
router.post('/respond', authenticateToken, authorizeRoles("customer"), respondToFeedback);
router.patch('/mark-read/:id', authenticateToken, authorizeRoles("customer"), markNotificationAsRead); 
router.patch('/mark-all-read', authenticateToken, authorizeRoles("customer"), markAllNotificationsAsRead); 

export default router;
