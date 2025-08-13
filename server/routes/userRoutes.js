import express from 'express';
import {
    fetchAllUsers,
    fetchUserById,
    createNewUser,
    updateUserById,
    deleteUserById, 
    getUserProfileData,
    toggleLikeController
} from '../controllers/userController.js';
import { authenticateToken, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/profile', authenticateToken, authorizeRoles('customer'), getUserProfileData);
router.post('/profile/like', authenticateToken, authorizeRoles('customer'), toggleLikeController);
router.get('/', authenticateToken, authorizeRoles('admin'), fetchAllUsers);
router.get('/:id', authenticateToken, authorizeRoles('admin'), fetchUserById);
router.post('/', createNewUser);
router.put('/:id', updateUserById);
router.delete('/:id', deleteUserById);

export default router;
