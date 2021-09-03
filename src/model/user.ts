import mongoose, { ObjectId, Document } from 'mongoose';

type UserDocument = Document & {
  name: string,
  email: string,
  picture: string,
  solutions: ObjectId[]
}

// create user schema
const userSchema = new mongoose.Schema<UserDocument>({
  name: String,
  email: String,
  picture: String,
  solutions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'solutions'
  }]
});

// create user model
export const User = mongoose.model<UserDocument>('users', userSchema);