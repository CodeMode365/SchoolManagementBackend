import { dbConnection } from '@/config';
import * as Models from '@/models';
import mongoose from 'mongoose';

async function cleanDb() {
  dbConnection;
  console.log('Connecting to the database...');
  try {
    for (let model in Models) {
      console.log(`##### Cleaning ${model} ######`);
      try {
        const dbModel = Models[model];
        await dbModel.deleteMany();
        console.log(`##### Cleaning ${model} completed ######`);
      } catch (error) {
        console.log(`#### Failed to clean ${model} due to:`, error);
        throw error;
      }
    }
    console.log('All cleaning completed successfully');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  } finally {
    dbConnection.close();
  }
}

cleanDb();
