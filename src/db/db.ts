// load dependencies
import mongoose from 'mongoose';

// connect with database
async function connectDB() {
  await mongoose.connect(`${process.env.MONGO_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log('database connected');
}

export default connectDB;