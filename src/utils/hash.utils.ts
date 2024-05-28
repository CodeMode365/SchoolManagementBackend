import bcrypt from 'bcrypt';

const hashPassword = (plainPassword: string) => {
  return bcrypt.hashSync(plainPassword, 10);
};

const comparePassword = (plainPassword: string, hashPassword: string) => {
  return bcrypt.compareSync(plainPassword, hashPassword);
};

export default {
  hashPassword,
  comparePassword,
};
