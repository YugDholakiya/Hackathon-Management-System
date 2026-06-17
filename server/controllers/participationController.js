import { Participation, Hackathon, User } from '../models/index.js';

export const registerForHackathon = async (req, res) => {
  try {
    const { hackathonId, teamName, problemStatementAbstract, teamDetails, technologyUsed } = req.body;

    const hackathon = await Hackathon.findByPk(hackathonId);
    if (!hackathon) {
      return res.status(404).json({ message: 'Hackathon not found' });
    }

    const existingParticipation = await Participation.findOne({
      where: { userId: req.user.id, hackathonId },
    });

    if (existingParticipation) {
      return res.status(409).json({ message: 'Already registered for this hackathon' });
    }

    const participation = await Participation.create({
      userId: req.user.id,
      hackathonId,
      teamName,
      problemStatementAbstract,
      teamDetails,
      technologyUsed,
      status: 'pending',
    });

    res.status(201).json({
      message: 'Registered for hackathon successfully',
      participation,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to register', error: error.message });
  }
};

export const getParticipants = async (req, res) => {
  try {
    const { hackathonId } = req.params;

    const hackathon = await Hackathon.findByPk(hackathonId);
    if (!hackathon) {
      return res.status(404).json({ message: 'Hackathon not found' });
    }

    const participants = await Participation.findAll({
      where: { hackathonId },
      include: [
        { model: User, as: 'participant', attributes: ['id', 'firstName', 'email', 'profileImage'] },
      ],
    });

    res.json({ participants });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch participants', error: error.message });
  }
};

export const withdrawFromHackathon = async (req, res) => {
  try {
    const { hackathonId } = req.params;

    const participation = await Participation.findOne({
      where: { userId: req.user.id, hackathonId },
    });

    if (!participation) {
      return res.status(404).json({ message: 'Participation not found' });
    }

    await participation.update({ status: 'withdrew' });

    res.json({ message: 'Withdrew from hackathon successfully', participation });
  } catch (error) {
    res.status(500).json({ message: 'Failed to withdraw', error: error.message });
  }
};

export const getUserRegistrations = async (req, res) => {
  try {
    const registrations = await Participation.findAll({
      where: { userId: req.user.id },
      include: [
        { model: Hackathon, as: 'hackathon', attributes: ['id', 'title', 'startDate', 'endDate', 'location'] },
      ],
    });

    res.json({ registrations });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch registrations', error: error.message });
  }
};

export const getAllParticipations = async (req, res) => {
  try {
    let participations;
    if (req.user.role === 'admin') {
      participations = await Participation.findAll({
        include: [
          { model: User, as: 'participant', attributes: ['id', 'firstName', 'email', 'profileImage'] },
          { model: Hackathon, as: 'hackathon', attributes: ['id', 'title', 'hostId'] },
        ],
      });
    } else if (req.user.role === 'host') {
      // Find all hackathons hosted by this user
      const hostHackathons = await Hackathon.findAll({
        where: { hostId: req.user.id },
        attributes: ['id'],
      });
      const hackathonIds = hostHackathons.map(h => h.id);
      
      participations = await Participation.findAll({
        where: { hackathonId: hackathonIds },
        include: [
          { model: User, as: 'participant', attributes: ['id', 'firstName', 'email', 'profileImage'] },
          { model: Hackathon, as: 'hackathon', attributes: ['id', 'title', 'hostId'] },
        ],
      });
    } else {
      // Participant: only get their own
      participations = await Participation.findAll({
        where: { userId: req.user.id },
        include: [
          { model: User, as: 'participant', attributes: ['id', 'firstName', 'email', 'profileImage'] },
          { model: Hackathon, as: 'hackathon', attributes: ['id', 'title', 'hostId'] },
        ],
      });
    }

    res.json({ participations });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch participations', error: error.message });
  }
};

export const getParticipationById = async (req, res) => {
  try {
    const { id } = req.params;
    const participation = await Participation.findByPk(id, {
      include: [
        { model: User, as: 'participant', attributes: ['id', 'firstName', 'email', 'profileImage'] },
        { model: Hackathon, as: 'hackathon', attributes: ['id', 'title', 'hostId'] },
      ],
    });

    if (!participation) {
      return res.status(404).json({ message: 'Participation not found' });
    }

    // Authorization check: participant, host of hackathon, or admin
    if (
      participation.userId !== req.user.id &&
      participation.hackathon.hostId !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({ message: 'Not authorized to view this application' });
    }

    res.json({ participation });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch participation details', error: error.message });
  }
};

export const updateParticipationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const participation = await Participation.findByPk(id, {
      include: [
        { model: Hackathon, as: 'hackathon' }
      ]
    });

    if (!participation) {
      return res.status(404).json({ message: 'Participation not found' });
    }

    // Verify if logged in user is the host of the hackathon or an admin
    if (participation.hackathon.hostId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this application' });
    }

    await participation.update({ status });

    res.json({ message: `Application status updated to ${status} successfully`, participation });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update application status', error: error.message });
  }
};
