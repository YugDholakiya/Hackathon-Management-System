import { Hackathon, User, Participation } from '../models/index.js';
import { Op } from 'sequelize';

export const createHackathon = async (req, res) => {
  try {
    const { title, description, startDate, endDate, registrationStart, registrationEnd, location, category, prizePool, maxParticipants, image, tagline, perks } = req.body;

    const hackathon = await Hackathon.create({
      title,
      description,
      startDate,
      endDate,
      registrationStart,
      registrationEnd,
      location,
      category,
      prizePool,
      maxParticipants,
      image,
      tagline,
      perks,
      hostId: req.user.id,
    });

    res.status(201).json({
      message: 'Hackathon created successfully',
      hackathon,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create hackathon', error: error.message });
  }
};

export const getHackathons = async (req, res) => {
  try {
    const hackathons = await Hackathon.findAll({
      include: [
        { model: User, as: 'host', attributes: ['id', 'firstName', 'email', 'profileImage'] },
        { model: Participation, as: 'participants', attributes: ['id'] },
      ],
    });

    res.json({
      hackathons: hackathons.map(h => ({
        ...h.toJSON(),
        participantCount: h.participants.length,
      })),
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch hackathons', error: error.message });
  }
};

export const getHackathonById = async (req, res) => {
  try {
    const { id } = req.params;
    const hackathon = await Hackathon.findByPk(id, {
      include: [
        { model: User, as: 'host', attributes: ['id', 'firstName', 'email', 'profileImage'] },
        { model: Participation, as: 'participants', attributes: ['id', 'userId'] },
      ],
    });

    if (!hackathon) {
      return res.status(404).json({ message: 'Hackathon not found' });
    }

    res.json({
      hackathon: {
        ...hackathon.toJSON(),
        participantCount: hackathon.participants.length,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch hackathon', error: error.message });
  }
};

export const updateHackathon = async (req, res) => {
  try {
    const { id } = req.params;
    const hackathon = await Hackathon.findByPk(id);

    if (!hackathon) {
      return res.status(404).json({ message: 'Hackathon not found' });
    }

    if (hackathon.hostId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this hackathon' });
    }

    await hackathon.update(req.body);
    res.json({ message: 'Hackathon updated successfully', hackathon });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update hackathon', error: error.message });
  }
};

export const deleteHackathon = async (req, res) => {
  try {
    const { id } = req.params;
    const hackathon = await Hackathon.findByPk(id);

    if (!hackathon) {
      return res.status(404).json({ message: 'Hackathon not found' });
    }

    if (hackathon.hostId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this hackathon' });
    }

    await hackathon.destroy();
    res.json({ message: 'Hackathon deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete hackathon', error: error.message });
  }
};

export const searchHackathons = async (req, res) => {
  try {
    const { query, category, status } = req.query;
    const where = {};

    if (query) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${query}%` } },
        { description: { [Op.iLike]: `%${query}%` } },
      ];
    }

    if (category) {
      where.category = category;
    }

    if (status) {
      where.status = status;
    }

    const hackathons = await Hackathon.findAll({
      where,
      include: [
        { model: User, as: 'host', attributes: ['id', 'firstName', 'email'] },
      ],
    });

    res.json({ hackathons });
  } catch (error) {
    res.status(500).json({ message: 'Failed to search hackathons', error: error.message });
  }
};
