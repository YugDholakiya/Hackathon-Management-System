import express from 'express';
import {
  getAllUsers,
  getUserById,
  updateUserProfile,
  getHostProfile,
} from '../controllers/userController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/profile', authMiddleware, updateUserProfile);
router.get('/host/:hostId', getHostProfile);

export default router;
