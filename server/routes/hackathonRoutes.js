import express from 'express';
import {
  createHackathon,
  getHackathons,
  getHackathonById,
  updateHackathon,
  deleteHackathon,
  searchHackathons,
} from '../controllers/hackathonController.js';
import { authMiddleware, hostMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getHackathons);
router.get('/search', searchHackathons);
router.get('/:id', getHackathonById);
router.post('/', authMiddleware, hostMiddleware, createHackathon);
router.put('/:id', authMiddleware, hostMiddleware, updateHackathon);
router.delete('/:id', authMiddleware, hostMiddleware, deleteHackathon);

export default router;
