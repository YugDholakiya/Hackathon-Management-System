import sequelize from '../config/database.js';
import { User, Hackathon, Participation } from '../models/index.js';

const seedDatabase = async () => {
  try {
    console.log('Starting database seed...');

    // Create 7 sample users
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
      {
        firstName: 'Emma',
        email: 'emma@example.com',
        password: 'password123',
        role: 'participant',
      },
      {
        firstName: 'David',
        email: 'david@example.com',
        password: 'password123',
        role: 'admin',
      }
    ], { individualHooks: true });

    console.log('✓ Sample users created');

    // Create 7 sample hackathons
    const hackathons = await Hackathon.bulkCreate([
      {
        title: 'AI & Machine Learning Hackathon',
        description: 'Build innovative AI solutions and shape the future of ML.',
        tagline: 'AI for the Future',
        startDate: new Date('2024-07-15'),
        endDate: new Date('2024-07-17'),
        registrationStart: new Date('2024-06-01'),
        registrationEnd: new Date('2024-07-10'),
        location: 'San Francisco, CA',
        category: 'AI',
        prizePool: 10000,
        maxParticipants: 100,
        hostId: users[0].id,
        status: 'completed',
      },
      {
        title: 'Web Development Challenge',
        description: 'Create amazing web applications utilizing modern frameworks.',
        tagline: 'Empowering the Web',
        startDate: new Date('2024-08-01'),
        endDate: new Date('2024-08-03'),
        registrationStart: new Date('2024-07-01'),
        registrationEnd: new Date('2024-07-28'),
        location: 'New York, NY',
        category: 'Web',
        prizePool: 5000,
        maxParticipants: 50,
        hostId: users[1].id,
        status: 'completed',
      },
      {
        title: 'Mobile App Hackathon',
        description: 'Develop mobile applications that change lives.',
        tagline: 'Mobile first generation',
        startDate: new Date('2024-09-10'),
        endDate: new Date('2024-09-12'),
        registrationStart: new Date('2024-08-15'),
        registrationEnd: new Date('2024-09-05'),
        location: 'Austin, TX',
        category: 'Mobile',
        prizePool: 8000,
        maxParticipants: 75,
        hostId: users[2].id,
        status: 'completed',
      },
      {
        title: 'Cloud Computing Innovation',
        description: 'Leverage the cloud to build scalable microservices.',
        tagline: 'Sky is the limit',
        startDate: new Date(new Date().getTime() + (7 * 24 * 60 * 60 * 1000)), // Starts next week
        endDate: new Date(new Date().getTime() + (10 * 24 * 60 * 60 * 1000)),
        registrationStart: new Date(new Date().getTime() - (5 * 24 * 60 * 60 * 1000)),
        registrationEnd: new Date(new Date().getTime() + (2 * 24 * 60 * 60 * 1000)),
        location: 'Seattle, WA',
        category: 'Cloud',
        prizePool: 15000,
        maxParticipants: 200,
        hostId: users[0].id,
        status: 'ongoing',
      },
      {
        title: 'Cybersecurity Capture The Flag',
        description: 'Find vulnerabilities and secure systems in an intense CTF.',
        tagline: 'Defend the digital world',
        startDate: new Date(new Date().getTime() + (30 * 24 * 60 * 60 * 1000)), // Next month
        endDate: new Date(new Date().getTime() + (32 * 24 * 60 * 60 * 1000)),
        registrationStart: new Date(new Date().getTime() + (5 * 24 * 60 * 60 * 1000)),
        registrationEnd: new Date(new Date().getTime() + (25 * 24 * 60 * 60 * 1000)),
        location: 'Online',
        category: 'Security',
        prizePool: 12000,
        maxParticipants: 150,
        hostId: users[1].id,
        status: 'upcoming',
      },
      {
        title: 'Blockchain & Web3 Builders',
        description: 'Develop decentralized applications (dApps) and smart contracts.',
        tagline: 'Decentralizing the future',
        startDate: new Date(new Date().getTime() + (45 * 24 * 60 * 60 * 1000)),
        endDate: new Date(new Date().getTime() + (48 * 24 * 60 * 60 * 1000)),
        registrationStart: new Date(new Date().getTime() + (10 * 24 * 60 * 60 * 1000)),
        registrationEnd: new Date(new Date().getTime() + (40 * 24 * 60 * 60 * 1000)),
        location: 'Miami, FL',
        category: 'Blockchain',
        prizePool: 20000,
        maxParticipants: 300,
        hostId: users[2].id,
        status: 'upcoming',
      },
      {
        title: 'IoT and Hardware Maker Faire',
        description: 'Combine hardware and software to build the ultimate IoT device.',
        tagline: 'Connecting things',
        startDate: new Date(new Date().getTime() + (60 * 24 * 60 * 60 * 1000)),
        endDate: new Date(new Date().getTime() + (62 * 24 * 60 * 60 * 1000)),
        registrationStart: new Date(new Date().getTime() + (20 * 24 * 60 * 60 * 1000)),
        registrationEnd: new Date(new Date().getTime() + (55 * 24 * 60 * 60 * 1000)),
        location: 'Berlin, Germany',
        category: 'Hardware',
        prizePool: 7000,
        maxParticipants: 100,
        hostId: users[0].id,
        status: 'upcoming',
      },
    ]);

    console.log('✓ Sample hackathons created');

    // Create 7 sample participations
    await Participation.bulkCreate([
      {
        userId: users[3].id,
        hackathonId: hackathons[0].id,
        teamName: 'AI Warriors',
        status: 'accepted',
      },
      {
        userId: users[4].id,
        hackathonId: hackathons[0].id,
        teamName: 'Tech Innovators',
        status: 'accepted',
      },
      {
        userId: users[5].id,
        hackathonId: hackathons[1].id,
        teamName: 'Web Wizards',
        status: 'accepted',
      },
      {
        userId: users[3].id,
        hackathonId: hackathons[3].id,
        teamName: 'Cloud Native',
        status: 'pending',
      },
      {
        userId: users[4].id,
        hackathonId: hackathons[3].id,
        teamName: 'Serverless Kings',
        status: 'pending',
      },
      {
        userId: users[5].id,
        hackathonId: hackathons[4].id,
        teamName: 'White Hats',
        status: 'registered',
      },
      {
        userId: users[3].id,
        hackathonId: hackathons[5].id,
        teamName: 'Crypto Punks',
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
