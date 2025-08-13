import express from 'express';
import * as MenuController from '../controllers/menuController.js';
import { authenticateToken, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post(
  '/',
  authenticateToken,
  authorizeRoles('lounge_staff'),
  MenuController.create
);

router.get(
  '/popular-items',
  authenticateToken,
  authorizeRoles("customer"),
  MenuController.getPopularItems
);

router.get(
  '/',
  authenticateToken,
  authorizeRoles('admin', 'lounge_staff'),
  MenuController.getAll
);

router.get(
  '/lounge/:loungeId',
  authenticateToken,
  authorizeRoles('lounge_staff', 'admin'),
  MenuController.getByLounge
);

router.get(
  '/:id',
  authenticateToken,
  authorizeRoles('admin', 'lounge_staff'),
  MenuController.getById
);

router.put(
  '/:id',
  authenticateToken,
  authorizeRoles('lounge_staff'),
  MenuController.update
);

router.delete(
  '/:id',
  authenticateToken,
  authorizeRoles('lounge_staff'),
  MenuController.remove
);

export default router;
