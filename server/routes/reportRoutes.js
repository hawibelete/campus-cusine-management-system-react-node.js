// routes/reportRoutes.js
import express from 'express';
import { getReport, getAggregatedReport } from '../controllers/reportController.js';
import { authenticateToken, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/orders', authenticateToken, authorizeRoles('lounge_staff'), getReport);
router.get('/aggregate', authenticateToken, authorizeRoles('admin'), getAggregatedReport);

export default router;
