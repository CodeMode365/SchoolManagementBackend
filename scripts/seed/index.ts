import '@/config';
import UserModel from '@/models/user.model';
import RoleModel from '@/models/role.model';
import PermissionModel from '@/models/permission.model';

const useModel = (modelName: string) => {
  switch (modelName.toLowerCase()) {
    case 'user':
      return UserModel;
    case 'role':
      return RoleModel;
    case 'permission':
      return PermissionModel;
    default:
      throw new Error(`Model ${modelName} not found`);
  }
};

const seedData = async (modelName: string, data: unknown[]) => {
  console.log(`##### Seeding ${modelName} ######`);
  try {
    const model: any = useModel(modelName);
    await model.insertMany(data);
    console.log(`##### Seed complete for ${modelName} #####`);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export { seedData };
