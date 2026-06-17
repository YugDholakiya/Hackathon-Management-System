import User from './User.js';
import Hackathon from './Hackathon.js';
import Participation from './Participation.js';

// Define associations
User.hasMany(Hackathon, { foreignKey: 'hostId', as: 'hostedHackathons' });
Hackathon.belongsTo(User, { foreignKey: 'hostId', as: 'host' });

User.hasMany(Participation, { foreignKey: 'userId', as: 'participations' });
Participation.belongsTo(User, { foreignKey: 'userId', as: 'participant' });

Hackathon.hasMany(Participation, { foreignKey: 'hackathonId', as: 'participants' });
Participation.belongsTo(Hackathon, { foreignKey: 'hackathonId', as: 'hackathon' });

export { User, Hackathon, Participation };
