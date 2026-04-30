import dotenv from 'dotenv';
dotenv.config(); // Загружаем .env файл
import mongoose from 'mongoose';
import app from './app';
import { seedAdmin } from './config/seedAdmin';

dotenv.config(); // Загружаем .env файл

const PORT = process.env["PORT"] || 5000;
const MONGO_URI = process.env['MONGO_URI'] || 'mongodb://localhost:27017/typescript';

if (!MONGO_URI) {
  throw new Error('MONGO_URI is not defined in .env file');
}

const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    await seedAdmin();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Startup error:', error);
    process.exit(1);
  }
}
startServer();
