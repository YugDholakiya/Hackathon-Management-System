import express from 'express';
import {
  registerForHackathon,
  getParticipants,
  withdrawFromHackathon,
  getUserRegistrations,
  getAllParticipations,
  getParticipationById,
  updateParticipationStatus,
} from '../controllers/participationController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', authMiddleware, registerForHackathon);
router.get('/', authMiddleware, getAllParticipations);
router.get('/user/registrations', authMiddleware, getUserRegistrations);
router.get('/application/:id', authMiddleware, getParticipationById);
router.put('/application/:id/status', authMiddleware, updateParticipationStatus);
router.get('/:hackathonId/participants', getParticipants);
router.delete('/:hackathonId/withdraw', authMiddleware, withdrawFromHackathon);

export default router;
