import { User, Hackathon } from '../models/index.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
    });

    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] },
      include: [
        { model: Hackathon, as: 'hostedHackathons', attributes: ['id', 'title', 'status'] },
      ],
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user', error: error.message });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, profileImage, tagline, designation, about } = req.body;
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.update({
      firstName: firstName || user.firstName,
      lastName: lastName || user.lastName,
      phoneNumber: phoneNumber || user.phoneNumber,
      profileImage: profileImage || user.profileImage,
      tagline: tagline !== undefined ? tagline : user.tagline,
      designation: designation !== undefined ? designation : user.designation,
      about: about !== undefined ? about : user.about,
    });

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        profileImage: user.profileImage,
        role: user.role,
        tagline: user.tagline,
        designation: user.designation,
        about: user.about,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update profile', error: error.message });
  }
};

export const getHostProfile = async (req, res) => {
  try {
    const { hostId } = req.params;
    const user = await User.findByPk(hostId, {
      attributes: { exclude: ['password'] },
      include: [
        { model: Hackathon, as: 'hostedHackathons', attributes: ['id', 'title', 'status', 'startDate'] },
      ],
    });

    if (!user || user.role !== 'host') {
      return res.status(404).json({ message: 'Host not found' });
    }

    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch host profile', error: error.message });
  }
};
