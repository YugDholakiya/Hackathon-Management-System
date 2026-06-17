import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Participation = sequelize.define('Participation', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  hackathonId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'hackathons',
      key: 'id',
    },
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending',
  },
  problemStatementAbstract: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  teamDetails: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  technologyUsed: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  registeredAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
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
  tableName: 'participations',
});

export default Participation;
