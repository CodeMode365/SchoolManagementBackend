import { seedData } from '.';
import organizationData from './data/organization.data';
import permissionData from './data/permission.data';
import roleData from './data/role.data';
import studentData from './data/student.data';
import userData from './data/user.data';

const seedAll = async () => {
  try {
    await seedData('user', undefined, userData);
    await seedData('permission', undefined, permissionData);
    await seedData('role', undefined, roleData);
    await seedData('transaction', 100);
    await seedData('admin', 2);
    await seedData('admission', 50);
    await seedData('apilog', 20);
    await seedData('attendance', 20);
    await seedData('bill', 20);
    await seedData('class', 5);
    await seedData('complaint', 100);
    await seedData('event', 50);
    await seedData('exam', 20);
    await seedData('fee', 40);
    await seedData('notification', 50);

    await seedData('parent', 20);
    await seedData('result', 20);

    await seedData('session', 20);
    await seedData('staff', 5);
    await seedData('student', 10);

    await seedData('teacher', 10);
    await seedData('token', 20);
    await seedData('subject', 5);
    await seedData('organization', undefined, organizationData);
    await seedData('group', 10);
    console.log('All seeding completed successfully');
  } catch (err) {
    console.error('Seeding failed:', err);
  } finally {
    process.exit(1);
  }
};

seedAll();
