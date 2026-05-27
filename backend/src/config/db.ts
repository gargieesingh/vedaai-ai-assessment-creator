import mongoose from 'mongoose';

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  
  if (!uri) {
    console.error('MONGODB_URI is not defined in the environment variables');
    process.exit(1);
  }

  mongoose.connection.on('connected', () => {
    console.log('mongodb connected');
  });

  mongoose.connection.on('error', (err) => {
    console.error(err);
    process.exit(1);
  });

  try {
    await mongoose.connect(uri);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
