/**
 * Seed script to load mock-data.json into MongoDB.
 * Usage: npm run seed
 *
 * Make sure .env has MONGO_URI set.
 */
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import Work from './models/Work.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/work_experience_db';
const dataPath = path.resolve('./mock-data.json');

async function run() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB for seeding');
  const raw = fs.readFileSync(dataPath);
  const docs = JSON.parse(raw);
  await Work.deleteMany({});
  const created = await Work.insertMany(docs);
  console.log(`Inserted ${created.length} documents`);
  await mongoose.disconnect();
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});