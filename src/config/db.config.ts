import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

import vars from '@/config/vars.config';

const db_conn = vars.db;

const mongooseOptions = {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4,
};

mongoose.connect(db_conn, mongooseOptions);
const db = mongoose.connection;

db.on('connected', () => {
  console.log('Connected to MongoDB');
});

db.on('error', (err: Error) => {
  console.error('Error connecting to MongoDB:', err);
});

db.on('disconnected', () => {
  console.log('Disconnected from MongoDB');
});

export default db;
