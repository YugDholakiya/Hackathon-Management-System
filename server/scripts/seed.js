import sequelize from '../config/database.js';
import { User, Hackathon, Participation } from '../models/index.js';

const seedDatabase = async () => {
  try {
    console.log('Starting database seed...');

    // Create sample users
    const users = await User.bulkCreate([
      {
        firstName: 'Ravi',
        email: 'ravi@example.com',
        password: 'password123',
        phoneNumber: '123-456-7890',
        role: 'host',
      },
      {
        firstName: 'Priya',
        email: 'priya@example.com',
        password: 'password456',
        phoneNumber: '987-654-3210',
        role: 'host',
      },
      {
        firstName: 'Amit',
        email: 'amit@example.com',
        password: 'password789',
        phoneNumber: '789-012-3456',
        role: 'host',
      },
      {
        firstName: 'John',
        email: 'john@example.com',
        password: 'password123',
        role: 'participant',
      },
      {
        firstName: 'Sarah',
        email: 'sarah@example.com',
        password: 'password123',
        role: 'participant',
      },
    ]);

    console.log('✓ Sample users created');

    // Create sample hackathons
    const hackathons = await Hackathon.bulkCreate([
      {
        title: 'AI & Machine Learning Hackathon',
        description: 'Build innovative AI solutions',
        startDate: new Date('2024-07-15'),
        endDate: new Date('2024-07-17'),
        location: 'San Francisco, CA',
        category: 'AI',
        prizePool: 10000,
        maxParticipants: 100,
        hostId: users[0].id,
        status: 'upcoming',
      },
      {
        title: 'Web Development Challenge',
        description: 'Create amazing web applications',
        startDate: new Date('2024-08-01'),
        endDate: new Date('2024-08-03'),
        location: 'New York, NY',
        category: 'Web',
        prizePool: 5000,
        maxParticipants: 50,
        hostId: users[1].id,
        status: 'upcoming',
      },
      {
        title: 'Mobile App Hackathon',
        description: 'Develop mobile applications',
        startDate: new Date('2024-09-10'),
        endDate: new Date('2024-09-12'),
        location: 'Austin, TX',
        category: 'Mobile',
        prizePool: 8000,
        maxParticipants: 75,
        hostId: users[2].id,
        status: 'upcoming',
      },
    ]);

    console.log('✓ Sample hackathons created');

    // Create sample participations
    await Participation.bulkCreate([
      {
        userId: users[3].id,
        hackathonId: hackathons[0].id,
        teamName: 'AI Warriors',
        status: 'registered',
      },
      {
        userId: users[4].id,
        hackathonId: hackathons[0].id,
        teamName: 'Tech Innovators',
        status: 'registered',
      },
      {
        userId: users[3].id,
        hackathonId: hackathons[1].id,
        teamName: 'Web Wizards',
        status: 'registered',
      },
    ]);

    console.log('✓ Sample participations created');
    console.log('✓ Database seeding completed successfully');
  } catch (error) {
    console.error('✗ Database seeding failed:', error);
  } finally {
    await sequelize.close();
  }
};

seedDatabase();
