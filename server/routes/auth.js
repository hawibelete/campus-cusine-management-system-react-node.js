import express from 'express';
import { authenticateToken, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/check', authenticateToken, authorizeRoles("lounge_staff", "admin", "customer"), (req, res) => {
  res.status(200).json({ message: 'Authenticated and authorized', user: req.user });
});

router.get('/me', authenticateToken, (req, res) => {
  const { id, role, username } = req.user;
  res.status(200).json({ id, role, username });
});


export default router;