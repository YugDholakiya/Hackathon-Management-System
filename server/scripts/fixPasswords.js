import sequelize from '../config/database.js';
import { User } from '../models/index.js';
import bcrypt from 'bcryptjs';

const fixPasswords = async () => {
  try {
    console.log('Starting to fix passwords...');
    
    const users = await User.findAll();
    let updatedCount = 0;
    
    for (const user of users) {
      if (!user.password.startsWith('$2')) {
        console.log(`Hashing password for user: ${user.email}`);
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
        await user.save();
        updatedCount++;
      }
    }
    
    console.log(`Successfully fixed passwords for ${updatedCount} users.`);
  } catch (error) {
    console.error('Failed to fix passwords:', error);
  } finally {
    await sequelize.close();
  }
};

fixPasswords();
