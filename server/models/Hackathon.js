import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Hackathon = sequelize.define('Hackathon', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  registrationStart: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  registrationEnd: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  prizePool: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  maxParticipants: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tagline: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  perks: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  hostId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  status: {
    type: DataTypes.ENUM('upcoming', 'ongoing', 'completed', 'cancelled'),
    defaultValue: 'upcoming',
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'hackathons',
});

export default Hackathon;
