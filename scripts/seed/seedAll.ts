import { seedData } from '.';
import { PermissionData, RoleData, UserData } from './data';

const seedAll = async () => {
  try {
    await seedData('permission', PermissionData);
    await seedData('role', RoleData);
    await seedData('user', UserData);
    console.log('All seeding completed successfully');
  } catch (err) {
    console.error('Seeding failed:', err);
  } finally {
    process.exit();
  }
};

seedAll();
