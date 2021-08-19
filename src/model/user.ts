// load dependencies
import mongoose, {Schema} from 'mongoose';

// create user schema
const userSchema: Schema = new mongoose.Schema({
  name: String,
  picture: String,
  solutions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'solution'
  }]
});

// create user model
export const User = mongoose.model('user', userSchema);