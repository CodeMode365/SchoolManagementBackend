import { seedData } from '.';
import permissionData from './data/permission.data';
import roleData from './data/role.data';
import userData from './data/user.data';

const seedAll = async () => {
  try {
    await seedData('user', undefined, userData);
    await seedData('permission', undefined, permissionData);
    await seedData('role', undefined, roleData);
    await seedData('transaction', 20);
    await seedData('admin', 20);
    await seedData('admission', 20);
    await seedData('apilog', 20);
    await seedData('attendance', 20);
    await seedData('bill', 20);
    await seedData('class', 20);
    await seedData('complaint', 20);
    await seedData('event', 20);
    await seedData('exam', 20);
    await seedData('fee', 20);
    await seedData('notification', 20);
    // await seedData('organization', 20);
    await seedData('parent', 20);
    await seedData('result', 20);
    // await seedData('session', 20);
    // await seedData('staff', 20);
    // await seedData('student', 20);
    await seedData('teacher', 20);
    await seedData('token', 20);
    // await seedData('group', 20);
    console.log('All seeding completed successfully');
  } catch (err) {
    console.error('Seeding failed:', err);
  } finally {
    process.exit(1);
  }
};

seedAll();
