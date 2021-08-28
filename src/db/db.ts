import mongoose from 'mongoose';

// connect with database
async function connectDB() {
  await mongoose.connect(`${process.env.MONGO_URI}`);
  console.log('database connected');
}

export default connectDB;